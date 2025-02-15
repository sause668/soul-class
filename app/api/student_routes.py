from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Student
from app.models import Class
from app.models import StudentClass

student_routes = Blueprint('students', __name__)


@student_routes.route('')
@login_required
def users():
    """
    Get all student users
    """
    students = Student.query.all()
    return jsonify([student.info() for student in students])

@student_routes.route('/<int:student_id>')
@login_required
def student_info(student_id):
    """
    Get student info by ID
    """
    student = Student.query.filter_by(id=student_id).first()

    if not student:
            return jsonify({"message": "Student not found"}), 404
    
    return jsonify(student.search_info()), 200

@student_routes.route('/<int:student_id>/classes', methods=['GET'])
@login_required
def get_all_student_classes(student_id):
    """
    Get all student classes
    """

    student = Student.query.filter_by(id=student_id).first()

    if not student:
            return jsonify({"message": "Student not found"}), 404

    classes = Class.query.\
        join(StudentClass, Class.id == StudentClass.class_id).\
        filter_by(student_id=student_id).all()
    
    return jsonify([class_.grades(student_id) for class_ in classes])

@student_routes.route('/<int:student_id>/classes/<int:class_id>', methods=['GET'])
@login_required
def get_student_class_by_id(student_id, class_id):
    """
    Get student class by ID 
    """

    student = Student.query.filter_by(id=student_id).first()

    if not student:
            return jsonify({"message": "Student not found"}), 404
    
    class_ = Class.query.\
        join(StudentClass, Class.id == StudentClass.class_id).\
        filter_by(student_id=student_id, class_id=class_id).first()
    
    if not class_:
        return jsonify({"message": "Class not found"}), 404
    
    return jsonify(class_.grades(student_id))

