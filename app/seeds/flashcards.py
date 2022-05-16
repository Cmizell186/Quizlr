from pydoc import describe
from app.models import db, FlashCard, quiz

# Adds FlashCards!
def seed_flashcards():
    flashcard1_1 = FlashCard(
        user_id = 3,
        quiz_id = 1,
        description = "when was christopher mizell born",
        answer = "june 18th 2000",
    )
    flashcard1_2 = FlashCard(
        user_id = 3,
        quiz_id = 1,
        description = "how old was christopher when he started high school",
        answer = "13"
    )

    db.session.add_all([flashcard1_1, flashcard1_2])
    db.session.commit()

def undo_flashcards():
    db.session.execute('TRUNCATE flashcards RESTART IDENTITY CASCADE;')
    db.session.commit()
