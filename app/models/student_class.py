from .db import db, environment, SCHEMA, add_prefix_for_prod



class StudentClass(db.Model):
    __tablename__ = 'students_classes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    # id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('students.id')), nullable=False, primary_key=True)
    class_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('classes.id')), nullable=False, primary_key=True)

    def to_dict(self):
        return {
            
        }