from app.models import db, Appointment, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime, date, time, timedelta


def seed_appointments():

    # Get current date for reference
    today = date.today()
    now = datetime.now()
    
    # Teachers: teacher_id 1-4 correspond to user_ids 1-4
    # Students: student_id 1+ correspond to user_ids 5+
    appointments = [
        {
            'teacher_id': 1,  # Severus Snape (Math)
            'student_id': 1,  # First student (user_id 5)
            'appointment_date': today + timedelta(days=2),
            'appointment_time': time(14, 0),  # 2:00 PM
            'notes': 'Math tutoring session - Algebra review',
            'created_at': now - timedelta(days=3),
            'updated_at': now - timedelta(days=3)
        },
        {
            'teacher_id': 1,  # Severus Snape (Math)
            'student_id': 2,  # Second student (user_id 6)
            'appointment_date': today + timedelta(days=5),
            'appointment_time': time(15, 30),  # 3:30 PM
            'notes': 'Geometry help needed',
            'created_at': now - timedelta(days=2),
            'updated_at': now - timedelta(days=2)
        },
        {
            'teacher_id': 2,  # Charles Xavier (Language Arts)
            'student_id': 3,  # Third student (user_id 7)
            'appointment_date': today + timedelta(days=1),
            'appointment_time': time(13, 0),  # 1:00 PM
            'notes': 'Book report discussion',
            'created_at': now - timedelta(days=4),
            'updated_at': now - timedelta(days=4)
        },
        {
            'teacher_id': 2,  # Charles Xavier (Language Arts)
            'student_id': 4,  # Fourth student (user_id 8)
            'appointment_date': today + timedelta(days=3),
            'appointment_time': time(14, 30),  # 2:30 PM
            'notes': 'Creative writing feedback session',
            'created_at': now - timedelta(days=1),
            'updated_at': now - timedelta(days=1)
        },
        {
            'teacher_id': 3,  # Albus Dumbledore (Science)
            'student_id': 5,  # Fifth student (user_id 9)
            'appointment_date': today + timedelta(days=4),
            'appointment_time': time(15, 0),  # 3:00 PM
            'notes': 'Science Fair project consultation',
            'created_at': now - timedelta(days=2),
            'updated_at': now - timedelta(days=2)
        },
        {
            'teacher_id': 3,  # Albus Dumbledore (Science)
            'student_id': 6,  # Sixth student (user_id 10)
            'appointment_date': today + timedelta(days=6),
            'appointment_time': time(16, 0),  # 4:00 PM
            'notes': 'Lab report review',
            'created_at': now,
            'updated_at': now
        },
        {
            'teacher_id': 4,  # Tywin Lannister (Social Studies)
            'student_id': 7,  # Seventh student (user_id 11)
            'appointment_date': today + timedelta(days=7),
            'appointment_time': time(13, 30),  # 1:30 PM
            'notes': 'History project guidance',
            'created_at': now - timedelta(days=1),
            'updated_at': now - timedelta(days=1)
        },
        {
            'teacher_id': 4,  # Tywin Lannister (Social Studies)
            'student_id': 8,  # Eighth student (user_id 12)
            'appointment_date': today + timedelta(days=8),
            'appointment_time': time(14, 0),  # 2:00 PM
            'notes': 'Research paper assistance',
            'created_at': now,
            'updated_at': now
        },
        {
            'teacher_id': 1,  # Severus Snape (Math)
            'student_id': 9,  # Ninth student (user_id 13)
            'appointment_date': today + timedelta(days=10),
            'appointment_time': time(15, 0),  # 3:00 PM
            'notes': 'Test preparation session',
            'created_at': now - timedelta(days=3),
            'updated_at': now - timedelta(days=3)
        },
        {
            'teacher_id': 2,  # Charles Xavier (Language Arts)
            'student_id': 10,  # Tenth student (user_id 14)
            'appointment_date': today + timedelta(days=9),
            'appointment_time': time(14, 0),  # 2:00 PM
            'notes': 'Essay writing workshop',
            'created_at': now - timedelta(days=2),
            'updated_at': now - timedelta(days=2)
        }
    ]

    for appointment in appointments:
        db.session.add(Appointment(
            teacher_id=appointment['teacher_id'],
            student_id=appointment['student_id'],
            appointment_date=appointment['appointment_date'],
            appointment_time=appointment['appointment_time'],
            notes=appointment['notes'],
            created_at=appointment['created_at'],
            updated_at=appointment['updated_at']
        ))
    
    db.session.commit()


def undo_appointments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.appointments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM appointments"))
        
    db.session.commit()
