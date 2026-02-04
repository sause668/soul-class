from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, StudentBehavior, Class
from app.forms import StudentBehaviorForm
from datetime import datetime

student_behavior_routes = Blueprint('student_behaviors', __name__)

@student_behavior_routes.route('/<int:student_behavior_id>', methods=['PUT'])
@login_required
def edit_student_behavior(student_behavior_id):
    """
    Edit a student behavior
    """
    if current_user.type != 'teacher':
        return jsonify({"message": "Teacher Authorization Required"}), 401
    
    form = StudentBehaviorForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        
        student_behavior_edit = StudentBehavior.query.filter_by(id=student_behavior_id).first()
        
        if not student_behavior_edit or student_behavior_edit.class_.teacher_id != current_user.teacher.id:
            return jsonify({"message": "Student behavior not found"}), 404
        
        student_behavior_edit.attention = form.data['attention']
        student_behavior_edit.learnability = form.data['learnability']
        student_behavior_edit.cooperation = form.data['cooperation']

        db.session.commit()
        
        class_ = Class.query.filter_by(id=student_behavior_edit.class_.id, teacher_id=current_user.teacher.id).first()
        
        return jsonify(class_.grade_book()), 200
    
    return form.errors, 400

@student_behavior_routes.route('/<int:student_behavior_id>', methods=['DELETE'])
@login_required
def delete_student_behavior(student_behavior_id):
    """
    Delete a student behavior
    """
    if current_user.type != 'teacher':
        return jsonify({"message": "Teacher Authorization Required"}), 401
    
    student_behavior_delete = StudentBehavior.query.filter_by(id=student_behavior_id).first()
    
    if not student_behavior_delete or student_behavior_delete.class_.teacher_id != current_user.teacher.id:
        return jsonify({"message": "Student behavior not found"}), 404
    
    db.session.delete(student_behavior_delete)
    db.session.commit()
    
    class_ = Class.query.filter_by(id=student_behavior_delete.class_.id, teacher_id=current_user.teacher.id).first()
    
    return jsonify(class_.grade_book()), 200