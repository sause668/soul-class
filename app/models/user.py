from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(15), nullable=False, unique=True)
    email = db.Column(db.String(30), nullable=False)
    first_name = db.Column(db.String(20), nullable=False)
    last_name = db.Column(db.String(20), nullable=False)
    type = db.Column(db.String(8), nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)

    teacher = db.relationship("Teacher", uselist=False, back_populates="user")
    student = db.relationship("Student", uselist=False, back_populates="user")
    admin = db.relationship("Admin", uselist=False, back_populates="user")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        if self.type == 'teacher':
            return {
                'id': self.id,
                'username': self.username,
                'email': self.email,
                'first_name': self.first_name,
                'last_name': self.last_name,
                'type': self.type,
                'teacher': self.teacher.to_dict()
            }
        else:
            return {
                'id': self.id,
                'username': self.username,
                'email': self.email,
                'first_name': self.first_name,
                'last_name': self.last_name,
                'type': self.type,
                'student': self.student.to_dict()
            }
        
    def sibling_info(self):
        return {
            'first_name': self.first_name,
            'last_name': self.last_name,
            'student': self.student.to_dict()
        }
        
    def signup_id(self):
        return self.id
    
    def full_name(self):
        return {
            'first_name': self.first_name,
            'last_name': self.last_name
        }