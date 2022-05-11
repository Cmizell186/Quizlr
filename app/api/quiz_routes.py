from flask import Blueprint
from app.models import Quiz

quiz_routes = Blueprint('quizzes', __name__)

@quiz_routes.route('/<int:id>')
def get_quizzes(id):
    quizzes = Quiz.query.filter(Quiz.subject_id == id).all()
    return {"quizzes": [quiz.to_dict() for quiz in quizzes]}
