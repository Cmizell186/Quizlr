from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    jyl = User(
        username='Jyl', email='jyl@ucd.io', password='ilovechris')
    demo = User(
        username='demo', email='demo@aa.io', password='password')
    chris = User(
        username='Chris', email='chris@chris.com', password='chris')

    damian = User(
        username='juandamianrojas', email='damiantheman@gmail.com', password='damian')

    jared = User(
        username='Jared', email='jareddd227@gmail.com', password='jared')

    jason = User(
        username='json', email='json@demo.com', password='jason')

    db.session.add_all([jyl, demo, chris, damian, jared, jason])

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
