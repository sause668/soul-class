from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, Optional
from .validators import length, range, isDate


class AnnouncementForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), length(200)])
    content = TextAreaField('content', validators=[DataRequired(), length(500)])
    image_url = StringField('image_url', validators=[Optional()])
    