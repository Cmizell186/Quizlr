from flask import Blueprint
from app.models import Quiz

quiz_routes = Blueprint('quizzes', __name__)

@quiz_routes.route('/')
def get_quizzes():
    quizzes = Quiz.query.all()
    return {"quizzes": [quiz.to_dict() for quiz in quizzes]}
