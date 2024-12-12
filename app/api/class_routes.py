from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Class, StudentClass, Student, Assignment
import json
from datetime import datetime

class_routes = Blueprint('classes', __name__)


@class_routes.route('', methods=['GET'])
@login_required
def get_all_classes():
    """
    Get all classes (Teacher & Student)
    """
    if current_user.type == 'teacher':
        classes = Class.query.filter_by(teacher_id=current_user.teacher.id).all()
        return jsonify([class_.teacher_dash() for class_ in classes])
    
    else:
        classes = Class.query.\
            join(StudentClass, Class.id == StudentClass.class_id).\
            filter_by(student_id=current_user.student.id).all()
        return jsonify([class_.student_dash() for class_ in classes])
    
@class_routes.route('/<int:class_id>', methods=['GET'])
@login_required
def get_class_by_id(class_id):
    """
    Get class by ID (Teacher & Student)
    """
    if current_user.type == 'teacher':
        class_ = Class.query.filter_by(id=class_id, teacher_id=current_user.teacher.id).first()

        if not class_:
            return jsonify({"message": "Class not found"}), 404
    
        return jsonify(class_.grade_book())
    
    else:
        class_ = Class.query.\
            join(StudentClass, Class.id == StudentClass.class_id).\
            filter_by(student_id=current_user.student.id, class_id=class_id).first()
        
        if not class_:
            return jsonify({"message": "Class not found"}), 404
        
        return jsonify(class_.grades(current_user.student.id))

    
@class_routes.route('', methods=['POST'])
@login_required
def create_class():
    """
    Create a class
    """
    print(current_user)
    if current_user.type != 'teacher':
        return jsonify({"message": "Teacher Authorization Required"}), 401
    
    req_body = json.loads(request.data)

    class_new = Class(
        teacher_id=current_user.teacher.id,
        name=req_body['name'],
        subject=req_body['subject'],
        grade=req_body['grade'],
        room=req_body['room'],
        period=req_body['period']
    )

    db.session.add(class_new)
    db.session.commit()

    classes = Class.query.filter_by(teacher_id=current_user.teacher.id).all()
    return jsonify([class_.teacher_dash() for class_ in classes]), 201

    return jsonify(class_new.teacher_dash()), 201


    
@class_routes.route('/<int:class_id>', methods=['PUT'])
@login_required
def edit_class(class_id):
    """
    Edit a class
    """
    if current_user.type != 'teacher':
        return jsonify({"message": "Teacher Authorization Required"}), 401
    
    req_body = json.loads(request.data)
    
    class_edit = Class.query.filter_by(id=class_id, teacher_id=current_user.teacher.id).first()

    if not class_edit:
            return jsonify({"message": "Class not found"}), 404
    
    class_edit.name = req_body['name']
    class_edit.subject = req_body['subject']
    class_edit.grade = req_body['grade']
    class_edit.period = req_body['period']
    class_edit.room = req_body['room']

    db.session.commit()

    classes = Class.query.filter_by(teacher_id=current_user.teacher.id).all()
    return jsonify([class_.teacher_dash() for class_ in classes]), 201

    return jsonify(class_edit.teacher_dash()), 201
    
    

@class_routes.route('/<int:class_id>', methods=['DELETE'])
@login_required
def delete_class(class_id):
    """
    Delete a class
    """
    if current_user.type != 'teacher':
        return jsonify({"message": "Teacher Authorization Required"}), 401
    
    class_delete = Class.query.filter_by(id=class_id, teacher_id=current_user.teacher.id).first()

    if not class_delete:
            return jsonify({"message": "Class not found"}), 404
    
    db.session.delete(class_delete)
    db.session.commit()

    classes = Class.query.filter_by(teacher_id=current_user.teacher.id).all()
    return jsonify([class_.teacher_dash() for class_ in classes]), 200

    return jsonify({'message': "Delete Successful"}), 200
    
    

@class_routes.route('/<int:class_id>/students/<int:student_id>', methods=['POST'])
@login_required
def add_student(class_id, student_id):
    """
    Add a student to a class
    """
    if current_user.type != 'teacher':
        return jsonify({"message": "Teacher Authorization Required"}), 401

    if not Class.query.filter_by(id=class_id, teacher_id=current_user.teacher.id).first():
            return jsonify({"message": "Class not found"}), 404
    
    if not Student.query.filter_by(id=student_id).first():
            return jsonify({"message": "Student not found"}), 404
    
    add_student = StudentClass(
         student_id=student_id,
         class_id=class_id
    )

    db.session.add(add_student)
    db.session.commit()

    class_ = Class.query.filter_by(id=class_id, teacher_id=current_user.teacher.id).first()
    
    return jsonify(class_.grade_book()), 201

    # return jsonify(add_student.to_dict()), 201
    
    


@class_routes.route('/<int:class_id>/students/<int:student_id>', methods=['DELETE'])
@login_required
def remove_student(class_id, student_id):
    """
    Remove a student from a class
    """
    if current_user.type != 'teacher':
        return jsonify({"message": "Teacher Authorization Required"}), 401

    if not Class.query.filter_by(id=class_id, teacher_id=current_user.teacher.id).first():
            return jsonify({"message": "Class not found"}), 404
    
    if not Student.query.filter_by(id=student_id).first():
            return jsonify({"message": "Student not found"}), 404
    
    remove_student = StudentClass.query.filter_by(class_id=class_id, student_id=student_id).first()

    if not remove_student:
            return jsonify({"message": "Student is not in this class"}), 404

    db.session.delete(remove_student)
    db.session.commit()

    class_ = Class.query.filter_by(id=class_id, teacher_id=current_user.teacher.id).first()
    
    return jsonify(class_.grade_book()), 200

    # return jsonify({'message': "Delete Successful"}), 200
    


@class_routes.route('/<int:class_id>/assignments', methods=['POST'])
@login_required
def create_assignment(class_id):
    """
    Create an assignment
    """
    if current_user.type != 'teacher':
        return jsonify({"message": "Teacher Authorization Required"}), 401
    
    if not Class.query.filter_by(id=class_id, teacher_id=current_user.teacher.id).first():
            return jsonify({"message": "Class not found"}), 404
    
    req_body = json.loads(request.data)
    
    assignment_new = Assignment(
        class_id=class_id,
        name=req_body['name'],
        type=req_body['type'],
        quarter=req_body['quarter'],
        due_date= datetime.now() # Needs edit
    )

    db.session.add(assignment_new)
    db.session.commit()

    class_ = Class.query.filter_by(id=class_id, teacher_id=current_user.teacher.id).first()
    
    return jsonify(class_.grade_book()), 201

    # return jsonify(assignment_new.grade_book()), 201
    

 
