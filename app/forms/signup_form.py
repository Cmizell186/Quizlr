from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError,EqualTo, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists, Length(min=5, max=25, message="Username must be 5-25 characters")])
    email = StringField('email', validators=[DataRequired(), Email(message="Invalid email address"),user_exists])
    password = StringField('password', validators=[DataRequired(), EqualTo('repeat_password', message="passwords must match"), Length(min=7, message="Password must be more than 7 characters")])
    repeat_password = StringField('repeat_password', validators=[DataRequired()])
