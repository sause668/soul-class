from .db import db, environment, SCHEMA, add_prefix_for_prod



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
    students = db.relationship("Student", uselist=True, secondary='students_classes', back_populates="classes")
    assignments = db.relationship("Assignment", uselist=True, back_populates="assignments", cascade="all, delete-orphan")

    def teacher_dash(self):
        return {
            "id": self.id,
            "teacher_id": self.teacher_id,
            "name": self.name,
            "subject": self.subject,
            "grade": self.grade,
            "period": self.period,
            "room": self.room,
            "num_students": len(self.students)
        }
    
    def student_dash(self, student_id):
        # gradeList = []

        # for assignment in self.assignments:
        #     for grade in assignment.to_dict()['grades']:

        return {
            "id": self.id,
            "teacher_id": self.teacher_id,
            "name": self.name,
            "subject": self.subject,
            "grade": self.grade,
            "period": self.period,
            "room": self.room,
            "current_grade": "To be worked on"
        }
    
    def grade_book(self):
        return {
            "id": self.id,
            "teacher_id": self.teacher_id,
            "name": self.name,
            "subject": self.subject,
            "grade": self.grade,
            "period": self.period,
            "room": self.room,
            "students": [student.to_dict() for student in self.students],
            "assignments": [assignment.grade_book() for assignment in self.assignments]
        }
    
    def grades(self, student_id):
        return {
            "id": self.id,
            "teacher_id": self.teacher_id,
            "name": self.name,
            "subject": self.subject,
            "grade": self.grade,
            "period": self.period,
            "room": self.room,
            "current_grade": "To be worked on",
            "assignments": [assignment.grade(student_id) for assignment in self.assignments]
        }
    
    