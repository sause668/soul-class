from app.models import db, Announcement, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime, timedelta


def seed_announcements():

    # Get current datetime for reference
    now = datetime.now()
    
    announcements = [
        {
            'user_id': 1,  # Severus Snape
            'title': 'Welcome Back to School!',
            'content': 'Welcome back to Soul Academy! I hope everyone had a wonderful break. This semester we will be focusing on advanced mathematics and problem-solving skills. Please make sure to bring your textbooks and calculators to class.',
            'image_url': None,
            'created_at': now - timedelta(days=5),
            'updated_at': now - timedelta(days=5)
        },
        {
            'user_id': 2,  # Charles Xavier
            'title': 'Language Arts Reading Assignment',
            'content': 'Students, please remember that your book reports are due next Friday. Make sure to include a summary, character analysis, and your personal reflection on the themes presented in the novel.',
            'image_url': None,
            'created_at': now - timedelta(days=3),
            'updated_at': now - timedelta(days=3)
        },
        {
            'user_id': 3,  # Albus Dumbledore
            'title': 'Science Fair Coming Soon',
            'content': 'The annual Science Fair is approaching! All students are encouraged to participate. Projects should demonstrate scientific inquiry and experimentation. Registration forms are available in the main office.',
            'image_url': None,
            'created_at': now - timedelta(days=2),
            'updated_at': now - timedelta(days=2)
        },
        {
            'user_id': 4,  # Tywin Lannister
            'title': 'History Project Guidelines',
            'content': 'For your upcoming history project on ancient civilizations, please remember to cite all sources properly. The project should include a visual component and a written essay of at least 500 words.',
            'image_url': None,
            'created_at': now - timedelta(days=1),
            'updated_at': now - timedelta(days=1)
        },
        {
            'user_id': 1,  # Severus Snape
            'title': 'Math Tutoring Available',
            'content': 'I will be offering extra math tutoring sessions every Tuesday and Thursday after school from 3:00 PM to 4:00 PM. If you need help with algebra or geometry, please sign up in advance.',
            'image_url': None,
            'created_at': now,
            'updated_at': now
        },
        {
            'user_id': 2,  # Charles Xavier
            'title': 'Creative Writing Contest',
            'content': 'Attention all writers! The school is hosting a creative writing contest. Submit your short stories, poems, or essays by the end of the month. Winners will be published in the school newsletter!',
            'image_url': None,
            'created_at': now,
            'updated_at': now
        }
    ]

    for announcement in announcements:
        db.session.add(Announcement(
            user_id=announcement['user_id'],
            title=announcement['title'],
            content=announcement['content'],
            image_url=announcement['image_url'],
            created_at=announcement['created_at'],
            updated_at=announcement['updated_at']
        ))
    
    db.session.commit()


def undo_announcements():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.announcements RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM announcements"))
        
    db.session.commit()
