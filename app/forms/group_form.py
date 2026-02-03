from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import InputRequired
from .validators import length, range


class AddGroupStudentForm(FlaskForm):
    student_id = IntegerField('student_id', validators=[InputRequired()])
    group_id = IntegerField('group_id', validators=[InputRequired()])

class RemoveGroupStudentForm(FlaskForm):
    student_id = IntegerField('student_id', validators=[InputRequired()])
    group_id = IntegerField('group_id', validators=[InputRequired()])

class ChangeGroupStudentForm(FlaskForm):
    student_id = IntegerField('student_id', validators=[InputRequired()])
    group_id_remove = IntegerField('group_id_remove', validators=[InputRequired()])
    group_id_add = IntegerField('group_id_add', validators=[InputRequired()])