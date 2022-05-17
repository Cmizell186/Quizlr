from flask import Blueprint, request, session
from flask_login import current_user
from app.api.auth_routes import validation_errors_to_error_messages
from app.models import db, FlashCard
from app.forms.flashcard_form import NewFlashcardForm
from app.forms.edit_flashcard_form import UpdateFlashcardForm

flashcard_routes = Blueprint('flashcards', __name__)

@flashcard_routes.route('/<int:id>')
def get_flashcards(id):
    flashcards = FlashCard.query.filter(FlashCard.quiz_id == id).all()
    return {"flashcards": [flashcard.to_dict() for flashcard in flashcards]}

@flashcard_routes.route('/<int:id>', methods=["POST"])
def post_flashcard(id):
    form = NewFlashcardForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if(form.validate_on_submit()):
        flashcard = FlashCard(
            front = form.front.data,
            back = form.back.data,
            user_id = current_user.id,
            quiz_id = id
        )
        db.session.add(flashcard)
        db.session.commit()
        return flashcard.to_dict()
    return {'error': validation_errors_to_error_messages(form.errors)}, 401

@flashcard_routes.route('/flashcard/<int:id>', methods=["GET"])
def get_specific_flashcard(id):
    flashcard = FlashCard.query.filter(FlashCard.id == id).first()
    return {"flashcard": flashcard.to_dict()}

@flashcard_routes.route('/flashcard/<int:id>', methods=["PUT"])
def update_flashcard(id):
    form = UpdateFlashcardForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    specific_flashcard = db.session.query(FlashCard).filter(FlashCard.id == id).first()
    if(form.validate_on_submit()):
        specific_flashcard.front = form.front.data
        specific_flashcard.back = form.back.data
        db.session.commit()
        return specific_flashcard.to_dict()
    return {"error": validation_errors_to_error_messages(form.errors)}, 401


@flashcard_routes.route('/flashcard/<int:id>', methods=["DELETE"])
def delete_flashcard(id):
    flashcard = db.session.query(FlashCard).filter(FlashCard.id == id).first()
    db.session.delete(flashcard)
    db.session.commit()
    return "successful delete"
