from app.models import db, Quiz

# Adds Quizzes!
def seed_quizzes():
    quiz1 = Quiz(
        user_id = 3,
        subject_id = 1,
        title = "Python practice",
        description = "Made this quiz to study python basics",
    )
    quiz2 = Quiz(
        user_id = 1,
        subject_id = 2,
        title = "Python practice",
        description = "Made this quiz to study python basics",
    )
    quiz3 = Quiz(
        user_id = 2,
        subject_id = 3,
        title = "Python practice",
        description = "Made this quiz to study python basics",
    )
    quiz4 = Quiz(
        user_id = 1,
        subject_id = 1,
        title = "Python practice",
        description = "Made this quiz to study python basics",
    )


    db.session.add_all([quiz1, quiz2, quiz3, quiz4])
    db.session.commit()

def undo_quizzes():
    db.session.execute('TRUNCATE quizzes RESTART IDENTITY CASCADE;')
    db.session.commit()
