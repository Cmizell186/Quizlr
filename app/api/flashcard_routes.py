from flask import Blueprint, request, session
from flask_login import current_user
from app.api.auth_routes import validation_errors_to_error_messages
from app.models import db, FlashCard
from app.forms.flashcard_form import NewFlashcardForm

flashcard_routes = Blueprint('flashcards', __name__)

@flashcard_routes.route('/<int:id>')
def get_flashcards(id):
    flashcards = FlashCard.query.filter(FlashCard.quiz_id == id).all()
    return {"flashcards": [flashcard.to_dict() for flashcard in flashcards]}

@flashcard_routes.route('/<int:id>', methods=["POST"])
def post_flashjcard(id):
    form = NewFlashcardForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if(form.validate_on_submit()):
        flashcard = FlashCard(
            description = form.description.data,
            answer = form.answer.data,
            user_id = current_user.id,
            quiz_id = id
        )
        db.session.add(flashcard)
        db.session.commit()
        return flashcard.to_dict()
    return {'error': validation_errors_to_error_messages(form.errors)}, 401
