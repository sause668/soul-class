from .db import db, environment, SCHEMA, add_prefix_for_prod
from .students_groups import StudentsGroups

students_groups = StudentsGroups.__table__

class Group(db.Model):
    __tablename__ = 'groups'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    class_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('classes.id')), nullable=False)
    name = db.Column(db.String(100), nullable=False)

    class_ = db.relationship("Class", uselist=False, back_populates="groups")
    students = db.relationship("Student", uselist=True, secondary=students_groups, back_populates="groups")

    def to_dict(self):
        return {
            "id": self.id,
            "class_id": self.class_id,
            "name": self.name,
        }

    def info(self):
        return {
            "id": self.id,
            "class_id": self.class_id,
            "name": self.name,
            "students": [student.info() for student in self.students]
        }
    
    