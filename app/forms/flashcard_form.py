from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length
from app.models import FlashCard

class NewFlashcardForm(FlaskForm):
    front = StringField('front', validators=[DataRequired(message="Please provide question"),
    Length(max=150, message="Question exceeds 150 character limit")])
    back = StringField('back', validators=[DataRequired(message="Please provide answer"),
    Length(max=150, message="Answer exceeds 150 character limit")])
