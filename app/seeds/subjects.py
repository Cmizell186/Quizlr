from ast import Sub
from app.models import db, Subject

# Adds Subjects!
def seed_subjects():
    science = Subject(
        subject = "Science",
    )

    artsandhumanities = Subject(
        subject = "Arts & Humanities",
    )

    math = Subject(
        subject = "Math",
    )

    langauge = Subject(
        subject = "Langauge",
    )

    socialscience = Subject(
        subject = "Social Science",
    )

    other = Subject(
        subject = "Other",
    )

    db.session.add_all([science,artsandhumanities,math,langauge,socialscience,other])
    db.session.commit()


def undo_subjects():
    db.session.execute('TRUNCATE subjects RESTART IDENTITY CASCADE;')
    db.session.commit()
