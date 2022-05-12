from flask import Blueprint, request
from flask_login import current_user
from app.models import db, Quiz, subject
from app.forms.quiz_form import NewQuizForm

quiz_routes = Blueprint('quizzes', __name__)

@quiz_routes.route('/<int:id>')
def get_quizzes(id):
    quizzes = Quiz.query.filter(Quiz.subject_id == id).all()
    return {"quizzes": [quiz.to_dict() for quiz in quizzes]}

@quiz_routes.route('/<int:id>', methods=["POST"])
def post_quizzes(id):
    form = NewQuizForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        quiz = Quiz(
            title = form.title.data,
            description = form.title.description,
            user_id = current_user.id,
            subject_id = id,
        )
        db.session.add(quiz)
        db.session.commit()

        return quiz.to_dict()
    else:
        print(form.errors)
        return "bad data"
