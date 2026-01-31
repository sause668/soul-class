from .db import db, environment, SCHEMA, add_prefix_for_prod



class StudentsGroups(db.Model):
    __tablename__ = 'students_groups'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    student_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('students.id')), nullable=False, primary_key=True)
    group_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('groups.id')), nullable=False, primary_key=True)

    def to_dict(self):
        return {
            'student_id': self.student_id,
            'group_id': self.group_id
        }