from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from .validators import range

class GradeForm(FlaskForm):
    grade = IntegerField('grade', validators=[range(0, 100)])
    
