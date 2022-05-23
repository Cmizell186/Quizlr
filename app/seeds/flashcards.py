from pydoc import describe
from app.models import db, FlashCard, quiz

# Adds FlashCards!
def seed_flashcards():

    # for quiz 1
    flashcard1_1 = FlashCard(
        user_id = 3,
        quiz_id = 1,
        front = "Step 1-Light Dependent",
        back = "CO2 and H2O enter the leaf",
    )
    flashcard1_2 = FlashCard(
        user_id = 3,
        quiz_id = 1,
        front = "Step 2- Light Dependent",
        back = "Light hits the pigment in the membrane of a thylakoid, splitting the H2O into O2"
    )
    flashcard1_3 = FlashCard(
        user_id = 3,
        quiz_id = 1,
        front = "Step 3- Light Dependent",
        back = "The electrons move down to enzymes"
    )
    flashcard1_4 = FlashCard(
        user_id = 3,
        quiz_id = 1,
        front = "Step 4-Light Dependent",
        back = "Sunlight hits the second pigment molecule allowing the enzymes to convert ADP to ATP and NADP+ gets converted to NADPH"
    )
    flashcard1_5 = FlashCard(
        user_id = 3,
        quiz_id = 1,
        front = "Step 5-Light independent",
        back = "The ATP and NADPH is used by the calvin cycle as a power source for converting carbon dioxide from the atmosphere into simple sugar glucose."
    )
    flashcard1_6 = FlashCard(
        user_id = 3,
        quiz_id = 1,
        front = "Step 6-Light independent",
        back = "The calvin cycle converts 3CO2 molecules from the atmosphere to glucose"
    )
    flashcard1_7 = FlashCard(
        user_id = 3,
        quiz_id = 1,
        front = "calvin cycle",
        back = "The second of two major stages in photosynthesis (following the light reactions), involving atmospheric CO2 fixation and reduction of the fixed carbon into carbohydrate."
    )

    # quiz 2
    flashcard2_1 = FlashCard(
        user_id = 3,
        quiz_id = 2,
        front = "Revolution",
        back = "A major change"
    )
    flashcard2_2 = FlashCard(
        user_id = 3,
        quiz_id = 2,
        front = "French Revolution",
        back = "A major change in government that began in 1789; it brought an end to the absolute monarchy and a start to a representative government"
    )
    flashcard2_3 = FlashCard(
        user_id = 3,
        quiz_id = 2,
        front = "Old Regime",
        back = "A combination of the absolute monarchy and feudalism in France; it included the three estates"
    )
    flashcard2_4 = FlashCard(
        user_id = 3,
        quiz_id = 2,
        front = "Estates",
        back = "The social classes in France"
    )

    db.session.add_all([flashcard1_1, flashcard1_2, flashcard1_3, flashcard1_4, flashcard1_5, flashcard1_6, flashcard1_7,
                        flashcard2_1, flashcard2_2, flashcard2_3, flashcard2_4])
    db.session.commit()

def undo_flashcards():
    db.session.execute('TRUNCATE flashcards RESTART IDENTITY CASCADE;')
    db.session.commit()
