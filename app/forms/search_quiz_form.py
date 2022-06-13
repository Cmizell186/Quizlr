from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class SearchQuizForm(FlaskForm):
    searched = StringField('searched', validators=[DataRequired()])
