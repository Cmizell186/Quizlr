from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired
from app.models import FlashCard

class UpdateFlashcardForm(FlaskForm):
    front = StringField('front', validators=[DataRequired(message="Please provide title")])
    back = StringField('back', validators=[DataRequired(message="Please provide answer")])
