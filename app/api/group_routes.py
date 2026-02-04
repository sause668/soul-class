from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Group, Class
from app.forms import GroupForm
from datetime import datetime

group_routes = Blueprint('groups', __name__)

@group_routes.route('/<int:group_id>', methods=['PUT'])
@login_required
def edit_group(group_id):
    """
    Edit a group
    """
    if current_user.type != 'teacher':
        return jsonify({"message": "Teacher Authorization Required"}), 401
    
    form = GroupForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        
        group_edit = Group.query.filter_by(id=group_id).first()
        
        if not group_edit or group_edit.class_.teacher_id != current_user.teacher.id:
            return jsonify({"message": "Group not found"}), 404
        
        group_edit.name = form.data['name']
        db.session.commit()
        
        class_ = Class.query.filter_by(id=group_edit.class_.id).first()
        
        return jsonify(class_.grade_book()), 200            
    
    return form.errors, 400

@group_routes.route('/<int:group_id>', methods=['DELETE'])
@login_required
def delete_group(group_id):
    """
    Delete a group
    """
    if current_user.type != 'teacher':
        return jsonify({"message": "Teacher Authorization Required"}), 401
    
    group_delete = Group.query.filter_by(id=group_id).first()
    
    if not group_delete or group_delete.class_.teacher_id != current_user.teacher.id:   
        return jsonify({"message": "Group not found"}), 404
    
    db.session.delete(group_delete)
    db.session.commit()
    
    class_ = Class.query.filter_by(id=group_delete.class_.id).first()
    
    return jsonify(class_.grade_book()), 200   