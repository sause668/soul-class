from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, DateField, TimeField
from wtforms.validators import DataRequired, Optional
from .validators import length


class AppointmentForm(FlaskForm):
    teacher_id = IntegerField('teacher_id', validators=[DataRequired()])
    student_id = IntegerField('student_id', validators=[DataRequired()])
    appointment_date = DateField('appointment_date', validators=[DataRequired()])
    appointment_time = TimeField('appointment_time', validators=[DataRequired()])
    notes = TextAreaField('notes', validators=[Optional(), length(1000)])
