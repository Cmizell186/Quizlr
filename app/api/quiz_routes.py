from crypt import methods
from flask import Blueprint, render_template, request, session
from flask_login import current_user
from app.api.auth_routes import validation_errors_to_error_messages
from app.models import db, Quiz, FlashCard
from app.forms.quiz_form import NewQuizForm
from app.forms.edit_quiz_form import EditQuiz
from app.forms.search_quiz_form import SearchQuizForm

quiz_routes = Blueprint('quizzes', __name__)

@quiz_routes.route('/<int:id>')
def get_quizzes(id):
    quizzes = Quiz.query.filter(Quiz.subject_id == id).all()
    return {"quizzes": [quiz.to_dict() for quiz in quizzes]}

@quiz_routes.route('/')
def get_all_quizzes():
    quizzes = Quiz.query.all()
    return {"quizzes": [quiz.to_dict() for quiz in quizzes]}

@quiz_routes.route('/quiz/<int:id>', methods=["GET"])
def get_specific_quiz(id):
    quiz = Quiz.query.filter(Quiz.id == id).first()
    return {"quiz": quiz.to_dict()}

@quiz_routes.route('/<int:id>', methods=["POST"])
def post_quizzes(id):
    form = NewQuizForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        quiz = Quiz(
            title = form.title.data,
            description = form.description.data,
            user_id = current_user.id,
            subject_id = id,
        )
        db.session.add(quiz)
        db.session.commit()
        new_quiz_flashcard = FlashCard(
            front = "Default Card! Edit this flashcard or create new ones!",
            back = "Welcome to the back of your card 😎 Answers will go back here",
            user_id = current_user.id,
            quiz_id = quiz.id
        )
        db.session.add(new_quiz_flashcard)
        db.session.commit()
        return quiz.to_dict()
    return {"error": validation_errors_to_error_messages(form.errors)}, 401


@quiz_routes.route('/quiz/<int:id>', methods=["PUT"])
def put_quiz(id):
    form = EditQuiz()
    form['csrf_token'].data = request.cookies['csrf_token']

    specific_quiz = db.session.query(Quiz).filter(Quiz.id == id).first()


    if(form.validate_on_submit()):
        specific_quiz.title = form.title.data
        specific_quiz.description = form.description.data
        db.session.commit()
        return specific_quiz.to_dict()
    return {"error": validation_errors_to_error_messages(form.errors)}, 401



@quiz_routes.route('/quiz/<int:id>', methods=["DELETE"])
def delete_quiz(id):
    quiz = db.session.query(Quiz).filter(Quiz.id == id).first()
    db.session.delete(quiz)
    db.session.commit()
    return "successful delete"


# search bar route
@quiz_routes.route('/search', methods=["POST"])
def search_quiz():
    form = SearchQuizForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print(form.data)
    quiz = Quiz.query
    if form.validate_on_submit():
        search_word = form.searched.data
        print(search_word, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
        # query database
        quiz.searched = quiz.filter(Quiz.title.like('%' + search_word + '%'))
        quiz = quiz.order_by(Quiz.title).all()
        return quiz.to_dict()
    return {"error": validation_errors_to_error_messages(form.errors)}, 401
