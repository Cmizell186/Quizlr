from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired
from app.models import Quiz

class EditQuiz(FlaskForm):
    title = StringField('title', validators=[DataRequired(message="Please provide title")])
    description = StringField('description', validators=[DataRequired(message="Please provide description")])
