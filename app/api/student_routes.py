from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Student

student_routes = Blueprint('students', __name__)


@student_routes.route('')
@login_required
def users():
    """
    Get all student users
    """
    students = Student.query.all()
    return jsonify([student.info() for student in students])


