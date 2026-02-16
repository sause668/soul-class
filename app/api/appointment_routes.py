from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Appointment, Teacher, Student
from app.forms import AppointmentForm
from datetime import datetime

appointment_routes = Blueprint('appointments', __name__)


@appointment_routes.route('', methods=['GET'])
@login_required
def get_all_appointments():
    """
    Get all appointments
    For teachers: returns appointments where they are the teacher
    For students: returns appointments where they are the student
    """
    if current_user.type == 'teacher':
        teacher = Teacher.query.filter_by(user_id=current_user.id).first()
        if not teacher:
            return jsonify({"message": "Teacher not found"}), 404
        appointments = Appointment.query.filter_by(teacher_id=teacher.id).order_by(
            Appointment.appointment_date.asc(), 
            Appointment.appointment_time.asc()
        ).all()
    elif current_user.type == 'student':
        student = Student.query.filter_by(user_id=current_user.id).first()
        if not student:
            return jsonify({"message": "Student not found"}), 404
        appointments = Appointment.query.filter_by(student_id=student.id).order_by(
            Appointment.appointment_date.asc(), 
            Appointment.appointment_time.asc()
        ).all()
    else:
        return jsonify({"message": "Unauthorized"}), 403
    
    return jsonify([appointment.to_dict() for appointment in appointments])


@appointment_routes.route('/<int:appointment_id>', methods=['GET'])
@login_required
def get_appointment_by_id(appointment_id):
    """
    Get appointment by ID
    """
    appointment = Appointment.query.filter_by(id=appointment_id).first()

    if not appointment:
        return jsonify({"message": "Appointment not found"}), 404

    # Check if user is authorized to view this appointment
    if current_user.type == 'teacher':
        teacher = Teacher.query.filter_by(user_id=current_user.id).first()
        if not teacher or appointment.teacher_id != teacher.id:
            return jsonify({"message": "Unauthorized"}), 403
    elif current_user.type == 'student':
        student = Student.query.filter_by(user_id=current_user.id).first()
        if not student or appointment.student_id != student.id:
            return jsonify({"message": "Unauthorized"}), 403
    else:
        return jsonify({"message": "Unauthorized"}), 403

    return jsonify(appointment.to_dict())


@appointment_routes.route('', methods=['POST'])
@login_required
def create_appointment():
    """
    Create an appointment
    Teachers can create appointments with any student
    Students can create appointments with any teacher
    """
    form = AppointmentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    
    if form.validate_on_submit():
        teacher_id = form.data['teacher_id']
        student_id = form.data['student_id']
        
        # Verify teacher exists
        teacher = Teacher.query.filter_by(id=teacher_id).first()
        if not teacher:
            return jsonify({"message": "Teacher not found"}), 404
        
        # Verify student exists
        student = Student.query.filter_by(id=student_id).first()
        if not student:
            return jsonify({"message": "Student not found"}), 404
        
        # Verify user is authorized (must be the teacher or student in the appointment)
        if current_user.type == 'teacher':
            if teacher.user_id != current_user.id:
                return jsonify({"message": "Unauthorized"}), 403
        elif current_user.type == 'student':
            if student.user_id != current_user.id:
                return jsonify({"message": "Unauthorized"}), 403
        else:
            return jsonify({"message": "Unauthorized"}), 403

        appointment_new = Appointment(
            teacher_id=teacher_id,
            student_id=student_id,
            appointment_date=form.data['appointment_date'],
            appointment_time=form.data['appointment_time'],
            notes=form.data.get('notes')
        )

        db.session.add(appointment_new)
        db.session.commit()

        return jsonify(appointment_new.to_dict()), 201
    return form.errors, 400


@appointment_routes.route('/<int:appointment_id>', methods=['PUT'])
@login_required
def update_appointment(appointment_id):
    """
    Update an appointment
    Only the teacher or student in the appointment can update it
    """
    appointment = Appointment.query.filter_by(id=appointment_id).first()

    if not appointment:
        return jsonify({"message": "Appointment not found"}), 404

    # Check if user is authorized
    if current_user.type == 'teacher':
        teacher = Teacher.query.filter_by(user_id=current_user.id).first()
        if not teacher or appointment.teacher_id != teacher.id:
            return jsonify({"message": "Unauthorized"}), 403
    elif current_user.type == 'student':
        student = Student.query.filter_by(user_id=current_user.id).first()
        if not student or appointment.student_id != student.id:
            return jsonify({"message": "Unauthorized"}), 403
    else:
        return jsonify({"message": "Unauthorized"}), 403

    form = AppointmentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    
    if form.validate_on_submit():
        # Verify teacher and student exist
        teacher = Teacher.query.filter_by(id=form.data['teacher_id']).first()
        if not teacher:
            return jsonify({"message": "Teacher not found"}), 404
        
        student = Student.query.filter_by(id=form.data['student_id']).first()
        if not student:
            return jsonify({"message": "Student not found"}), 404

        appointment.teacher_id = form.data['teacher_id']
        appointment.student_id = form.data['student_id']
        appointment.appointment_date = form.data['appointment_date']
        appointment.appointment_time = form.data['appointment_time']
        appointment.notes = form.data.get('notes')
        appointment.updated_at = datetime.utcnow()

        db.session.commit()

        return jsonify(appointment.to_dict()), 200
    return form.errors, 400


@appointment_routes.route('/<int:appointment_id>', methods=['DELETE'])
@login_required
def delete_appointment(appointment_id):
    """
    Delete an appointment
    Only the teacher or student in the appointment can delete it
    """
    appointment = Appointment.query.filter_by(id=appointment_id).first()

    if not appointment:
        return jsonify({"message": "Appointment not found"}), 404

    # Check if user is authorized
    if current_user.type == 'teacher':
        teacher = Teacher.query.filter_by(user_id=current_user.id).first()
        if not teacher or appointment.teacher_id != teacher.id:
            return jsonify({"message": "Unauthorized"}), 403
    elif current_user.type == 'student':
        student = Student.query.filter_by(user_id=current_user.id).first()
        if not student or appointment.student_id != student.id:
            return jsonify({"message": "Unauthorized"}), 403
    else:
        return jsonify({"message": "Unauthorized"}), 403

    try:
        db.session.delete(appointment)
        db.session.commit()

        return jsonify({"message": "Appointment deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 500
