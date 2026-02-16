from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime, date, time


class Appointment(db.Model):
    __tablename__ = 'appointments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    teacher_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('teachers.id')), nullable=False)
    student_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('students.id')), nullable=False)
    appointment_date = db.Column(db.Date, nullable=False)
    appointment_time = db.Column(db.Time, nullable=False)
    notes = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    teacher = db.relationship("Teacher", back_populates="appointments")
    student = db.relationship("Student", back_populates="appointments")

    def to_dict(self):
        return {
            'id': self.id,
            'teacher_id': self.teacher_id,
            'student_id': self.student_id,
            'appointment_date': self.appointment_date.isoformat() if self.appointment_date else None,
            'appointment_time': self.appointment_time.strftime('%H:%M') if self.appointment_time else None,
            'notes': self.notes,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'teacher_first_name': self.teacher.user.first_name,
            'teacher_last_name': self.teacher.user.last_name,
            'student_first_name': self.student.user.first_name,
            'student_last_name': self.student.user.last_name,
        }
