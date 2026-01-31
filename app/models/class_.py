from .db import db, environment, SCHEMA, add_prefix_for_prod
from .student_class import StudentClass

students_classes = StudentClass.__table__

class Class(db.Model):
    __tablename__ = 'classes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    teacher_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('teachers.id')), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    subject = db.Column(db.String(50), nullable=False)
    grade = db.Column(db.Integer, nullable=False)
    room = db.Column(db.Integer, nullable=False)
    period = db.Column(db.Integer, nullable=False)

    teacher = db.relationship("Teacher", uselist=False, back_populates="classes")
    students = db.relationship("Student", uselist=True, secondary=students_classes, back_populates="classes")
    assignments = db.relationship("Assignment", uselist=True, back_populates="class_", cascade="all, delete-orphan")
    behaviors = db.relationship("StudentBehavior", uselist=True, back_populates="class_", cascade="all, delete-orphan")
    groups = db.relationship("Group", uselist=True, back_populates="class_")

    def teacher_dash(self):
        return {
            "id": self.id,
            "teacher_id": self.teacher_id,
            "name": self.name,
            "subject": self.subject,
            "grade": self.grade,
            "period": self.period,
            "room": self.room,
            "num_students": len(self.students),
            "behaviors": [behavior.teacher_dash() for behavior in self.behaviors]
        }

    def student_dash(self):
        return {
            "id": self.id,
            "teacher_id": self.teacher_id,
            "name": self.name,
            "subject": self.subject,
            "grade": self.grade,
            "period": self.period,
            "room": self.room,
            "current_grade": "To be worked on",
            "teacher": self.teacher.info()
        }
    
    def grade_book(self):
        return {
            "id": self.id,
            "teacher_id": self.teacher_id,
            "teacher": self.teacher.info(),
            "name": self.name,
            "subject": self.subject,
            "grade": self.grade,
            "period": self.period,
            "room": self.room,
            "students": [student.info() for student in self.students],
            "assignments": [assignment.grade_book() for assignment in self.assignments],
            "behaviors": [behavior.info() for behavior in self.behaviors],
            "groups": [group.info() for group in self.groups]
        }

    def behavior_book(self):
        return {
            "id": self.id,
            "teacher_id": self.teacher_id,
            "name": self.name,
            "subject": self.subject,
            "grade": self.grade,
            "period": self.period,
            "room": self.room,
            "students": [student.info() for student in self.students],
            "behaviors": [behavior.info() for behavior in self.behaviors]
        }
    
    def grades(self, student_id):

        current_behavior = None
        current_group = {'name': 'No Group', 'students': []}

        for group in self.groups:
            groupInfo = group.info()
            for student in groupInfo['students']:
                if student['id'] == student_id:
                    current_group = {
                        'name': groupInfo['name'],
                        'students': [student.info() for student in group.students]
                    }
                    break

        for behavior in self.behaviors:
            behaviorInfo = behavior.to_dict()
            if behaviorInfo['student_id'] == student_id:
                current_behavior = {
                    'attention': behaviorInfo['attention'],
                    'learnability': behaviorInfo['learnability'],
                    'cooperation': behaviorInfo['cooperation']
                }


        return {
            "id": self.id,
            "teacher_id": self.teacher_id,
            "name": self.name,
            "subject": self.subject,
            "grade": self.grade,
            "period": self.period,
            "room": self.room,
            "current_grade": "To be worked on",
            "assignments": [assignment.grade(student_id) for assignment in self.assignments],
            "behaviors": current_behavior,
            "teacher": self.teacher.info(),
            "group": current_group
        }
    
    def class_search(self):
        return {
            "id": self.id,
            "teacher_id": self.teacher_id,
            "name": self.name,
            "subject": self.subject,
            "grade": self.grade,
            "period": self.period,
            "room": self.room,
            "teacher": self.teacher.info(),
            "students": [student.info() for student in self.students]
        }
    
    def class_info(self):
        return {
            "id": self.id,
            "teacher_id": self.teacher_id,
            "name": self.name,
            "subject": self.subject,
            "grade": self.grade,
            "period": self.period,
            "room": self.room,
            "teacher": self.teacher.info(),
            "students": [student.info() for student in self.students],
            "assignments": [assignment.grade_book() for assignment in self.assignments],
            "behaviors": [behavior.info_limited() for behavior in self.behaviors]
        }
    
    