from flask import Blueprint, request, session
from flask_login import current_user
from app.api.auth_routes import validation_errors_to_error_messages
from app.models import db, FlashCard

flashcard_routes = Blueprint('flashcards', __name__)

@flashcard_routes.route('/<int:id>')
def get_flashcards(id):
    flashcards = FlashCard.query.filter(FlashCard.quiz_id == id).all()
    return {"flashcards": [flashcard.to_dict() for flashcard in flashcards]}
