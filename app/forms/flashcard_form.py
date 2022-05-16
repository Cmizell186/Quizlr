from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired
from app.models import FlashCard

class NewFlashcardForm(FlaskForm):
    description = StringField('description', validators=[DataRequired()])
    answer = StringField('answer', validators=[DataRequired()])
