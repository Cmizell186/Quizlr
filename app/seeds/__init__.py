from flask.cli import AppGroup
from .users import seed_users, undo_users
from .subjects import seed_subjects, undo_subjects
from .quizzes import seed_quizzes, undo_quizzes
from .flashcards import seed_flashcards, undo_flashcards

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    # Add other seed functions here
    seed_subjects()
    seed_quizzes()
    seed_flashcards()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    # Add other undo functions here
    undo_subjects()
    undo_quizzes()
    undo_flashcards()
