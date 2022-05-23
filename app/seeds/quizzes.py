from app.models import db, Quiz

# Adds Quizzes!
def seed_quizzes():
    quiz1 = Quiz(
        user_id = 3,
        subject_id = 1,
        title = "Steps of Photosynthesis",
        description = "Made this quiz to study steps of photosynthesis",
    )
    quiz2 = Quiz(
        user_id = 3,
        subject_id = 2,
        title = "French Revolution",
        description = "Made this quiz to study the French Revolution",
    )


    db.session.add_all([quiz1, quiz2])
    db.session.commit()

def undo_quizzes():
    db.session.execute('TRUNCATE quizzes RESTART IDENTITY CASCADE;')
    db.session.commit()
