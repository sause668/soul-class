from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Announcement
from app.forms import AnnouncementForm
from datetime import datetime

announcement_routes = Blueprint('announcements', __name__)


@announcement_routes.route('', methods=['GET'])
@login_required
def get_all_announcements():
    """
    Get all announcements
    """
    announcements = Announcement.query.order_by(Announcement.created_at.desc()).all()
    return jsonify([announcement.to_dict() for announcement in announcements])


@announcement_routes.route('/<int:announcement_id>', methods=['GET'])
@login_required
def get_announcement_by_id(announcement_id):
    """
    Get announcement by ID
    """
    announcement = Announcement.query.filter_by(id=announcement_id).first()

    if not announcement:
        return jsonify({"message": "Announcement not found"}), 404

    return jsonify(announcement.to_dict())


@announcement_routes.route('', methods=['POST'])
@login_required
def create_announcement():
    """
    Create an announcement
    """
    if current_user.type != 'teacher':
        return jsonify({"message": "Teacher Authorization Required"}), 401
    
    form = AnnouncementForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        announcement_new = Announcement(
            user_id=current_user.id,
            title=form.data['title'],
            content=form.data['content'],
            image_url=form.data['image_url']
        )

        db.session.add(announcement_new)
        db.session.commit()

        return jsonify(announcement_new.to_dict()), 201
    return form.errors, 400


@announcement_routes.route('/<int:announcement_id>', methods=['PUT'])
@login_required
def update_announcement(announcement_id):
    """
    Update an announcement
    """
    if current_user.type != 'teacher':
        return jsonify({"message": "Teacher Authorization Required"}), 401
    
    form = AnnouncementForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        announcement_edit = Announcement.query.filter_by(id=announcement_id).first()

        if not announcement_edit or announcement_edit.user_id != current_user.id:
            return jsonify({"message": "Announcement not found"}), 404

        announcement_edit.title = form.data['title']
        announcement_edit.content = form.data['content']
        announcement_edit.image_url = form.data['image_url']

        db.session.commit()

        return jsonify(announcement_edit.to_dict()), 200
    return form.errors, 400


@announcement_routes.route('/<int:announcement_id>', methods=['DELETE'])
@login_required
def delete_announcement(announcement_id):
    """
    Delete an announcement
    """
    if current_user.type != 'teacher':
        return jsonify({"message": "Teacher Authorization Required"}), 401
    
    announcement = Announcement.query.filter_by(id=announcement_id).first()

    if not announcement:
        return jsonify({"message": "Announcement not found"}), 404

    # Only the author can delete their announcement
    if announcement.user_id != current_user.id:
        return jsonify({"message": "Unauthorized"}), 403

    try:
        db.session.delete(announcement)
        db.session.commit()

        return jsonify({"message": "Announcement deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 500
