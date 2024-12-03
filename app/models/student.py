from .db import db, environment, SCHEMA, add_prefix_for_prod



class Student(db.Model):
    __tablename__ = 'students'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    grade = db.Column(db.Integer, nullable=False)

    user = db.relationship("User", back_populates="student")
    classes = db.relationship("Class", uselist=True, secondary='students_classes', back_populates="students")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'grade': self.grade
        }