from app.models import db, StudentsGroups, environment, SCHEMA
from sqlalchemy.sql import text



def seed_students_groups():

    algebra = [
        {
            'class_id': 1,
            'groups': [
                {
                    'group_id': 1,
                    'student_ids': [1, 2, 3]
                },
                {
                    'group_id': 2,
                    'student_ids': [4, 5, 6]
                },
                {
                    'group_id': 3,
                    'student_ids': [7, 8, 9, 10]
                },
            ]
        },
        {
            'class_id': 2,
            'groups': [
                {
                    'group_id': 4,
                    'student_ids': [11, 12, 13]
                },
                {
                    'group_id': 5,
                    'student_ids': [14, 15, 16, 17]
                },
                {
                    'group_id': 6,
                    'student_ids': [18, 19, 20, 21]
                },
            ]
        },
        {
            'class_id': 3,
            'groups': [
                {
                    'group_id': 7,
                    'student_ids': [22, 23, 24]
                },
                {
                    'group_id': 8,
                    'student_ids': [25, 26, 27, ]
                },
                {
                    'group_id': 9,
                    'student_ids': [28, 29, 30]
                },
            ]
        },
        {
            'class_id': 4,
            'groups': [
                {
                    'group_id': 10,
                    'student_ids': [31, 32, 33]
                },
                {
                    'group_id': 11,
                    'student_ids': [34, 35, 36, 37]
                },
                {
                    'group_id': 12,
                    'student_ids': [38, 39, 40, 41]
                },
            ]
        }
    ]

    creative_writing = [
        {
            'class_id': 5,
            'groups': [
                {
                    'group_id': 13,
                    'student_ids': [31, 32, 33]
                },
                {
                    'group_id': 14,
                    'student_ids': [34, 35, 36, 37]
                },
                {
                    'group_id': 15,
                    'student_ids': [38, 39, 40, 41]
                },
            ]
        },
        {
            'class_id': 6,
            'groups': [
                {
                    'group_id': 16,
                    'student_ids': [1, 2, 3]
                },
                {
                    'group_id': 17,
                    'student_ids': [4, 5, 6]
                },
                {
                    'group_id': 18,
                    'student_ids': [7, 8, 9, 10]
                },
            ]
        },
        {
            'class_id': 7,
            'groups': [
                {
                    'group_id': 19,
                    'student_ids': [11, 12, 13]
                },
                {
                    'group_id': 20,
                    'student_ids': [14, 15, 16, 17]
                },
                {
                    'group_id': 21,
                    'student_ids': [18, 19, 20, 21]
                },
            ]
        },
        {
            'class_id': 8,
                'groups': [
                {
                    'group_id': 22,
                    'student_ids': [22, 23, 24]
                },
                {
                    'group_id': 23,
                    'student_ids': [25, 26, 27]
                },
                {
                    'group_id': 24,
                    'student_ids': [28, 29, 30]
                },
            ]
        },
        
    ]

    physics = [
        {
            'class_id': 9,
            'groups': [
                {
                    'group_id': 25,
                    'student_ids': [22, 23, 24]
                },
                {
                    'group_id': 26,
                    'student_ids': [25, 26, 27]
                },
                {
                    'group_id': 27,
                    'student_ids': [28, 29, 30]
                },
            ]
        },
        {
            'class_id': 10,
            'groups': [
                {
                    'group_id': 28,
                    'student_ids': [31, 32, 33]
                },
                {
                    'group_id': 29,
                    'student_ids': [34, 35, 36, 37]
                },
                {
                    'group_id': 30,
                    'student_ids': [38, 39, 40, 41]
                },
            ]
        },
        {
            'class_id': 11,
            'groups': [
                {
                    'group_id': 31,
                    'student_ids': [1, 2, 3]
                },
                {
                    'group_id': 32,
                    'student_ids': [4, 5, 6]
                },
                {
                    'group_id': 33,
                    'student_ids': [7, 8, 9, 10]
                },
            ]
        },
        {
            'class_id': 12,
                'groups': [
                {
                    'group_id': 34,
                    'student_ids': [11, 12, 13]
                },
                {
                    'group_id': 35,
                    'student_ids': [14, 15, 16, 17]
                },
                {
                    'group_id': 36,
                    'student_ids': [18, 19, 20, 21]
                },
            ]
        },
        
    ]
    
    us_history = [
        {
            'class_id': 13,
            'groups': [
                {
                    'group_id': 37,
                    'student_ids': [11, 12, 13]
                },
                {
                    'group_id': 38,
                    'student_ids': [14, 15, 16, 17]
                },
                {
                    'group_id': 39,
                    'student_ids': [18, 19, 20, 21]
                },
            ]
        },
        {
            'class_id': 14,
            'groups': [
                {
                    'group_id': 40,
                    'student_ids': [22, 23, 24]
                },
                {
                    'group_id': 41,
                    'student_ids': [25, 26, 27]
                },
                {
                    'group_id': 42,
                    'student_ids': [28, 29, 30]
                },
            ]
        },
        {
            'class_id': 15,
            'groups': [
                {
                    'group_id': 43,
                    'student_ids': [31, 32, 33]
                },
                {
                    'group_id': 44,
                    'student_ids': [34, 35, 36, 37]
                },
                {
                    'group_id': 45,
                    'student_ids': [38, 39, 40, 41]
                },
            ]
        },
        {
            'class_id': 16,
                'groups': [
                {
                    'group_id': 46,
                    'student_ids': [1, 2, 3]
                },
                {
                    'group_id': 47,
                    'student_ids': [4, 5, 6]
                },
                {
                    'group_id': 48,
                    'student_ids': [7, 8, 9, 10]
                },
            ]
        },
        
    ]

    def add_students_groups(classes):
        for class_ in classes:
            for group in class_['groups']:
                for student_id in group['student_ids']:
                    db.session.add(StudentsGroups(
                        group_id=group['group_id'],
                        student_id=student_id
                    ))

    add_students_groups(algebra)
    add_students_groups(creative_writing)
    add_students_groups(physics)
    add_students_groups(us_history)
    

    
    db.session.commit()



def undo_students_groups():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.students_groups RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM students_groups"))
        
    db.session.commit()