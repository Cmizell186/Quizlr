from pydoc import describe
from app.models import db, FlashCard

# Adds FlashCards!
def seed_flashcards():
    flashcard1 = FlashCard(
        user_id = 3,
        quiz_id = 1,
        description = "",
    )
