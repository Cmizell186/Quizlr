from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length
from app.models import Quiz

class EditQuiz(FlaskForm):
    title = StringField('title', validators=[DataRequired(message="Please provide title"), Length(max=120, message="Title exceeds 120 character limit")])
    description = StringField('description', validators=[DataRequired(message="Please provide description"), Length(max=255, message="Description exceeds 255 character limit")])
