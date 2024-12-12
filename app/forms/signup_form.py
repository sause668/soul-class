from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpFormTeacher(FlaskForm):
    username = StringField('username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists])
    first_name = StringField('first_name', validators=[DataRequired()])
    last_name = StringField('last_name', validators=[DataRequired()])
    type = StringField('type', validators=[DataRequired()])
    primary_grade = IntegerField('type', validators=[DataRequired()])
    primary_subject = StringField('type', validators=[DataRequired()])
    password = StringField('password', validators=[DataRequired()])

class SignUpFormStudent(FlaskForm):
    username = StringField('username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists])
    first_name = StringField('first_name', validators=[DataRequired()])
    last_name = StringField('last_name', validators=[DataRequired()])
    type = StringField('type', validators=[DataRequired()])
    grade = IntegerField('type', validators=[DataRequired()])
    password = StringField('password', validators=[DataRequired()])

class SignUpForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists])
    first_name = StringField('first_name', validators=[DataRequired()])
    last_name = StringField('last_name', validators=[DataRequired()])
    type = StringField('type', validators=[DataRequired()])
    primary_grade = StringField('type', validators=[DataRequired()])
    primary_subject = StringField('type', validators=[DataRequired()])
    grade = StringField('type', validators=[DataRequired()])
    password = StringField('password', validators=[DataRequired()])
