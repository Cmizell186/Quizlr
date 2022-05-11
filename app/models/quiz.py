from .db import db
from datetime import datetime

class Quiz(db.Model):
    __tablename__ = 'quizzes'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id") ,nullable=False) # references user id
    subject_id = db.Column(db.Integer, db.ForeignKey("subjects.id"), nullable=False) # references subject id
    title = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    user = db.relationship("User", back_populates='quiz') # relationship to user
    subject = db.relationship("Subject", back_populates='quiz') # relationship to subject
    flashcard = db.relationship("FlashCard", back_populates='quiz') # relationship to flashcards
    study_set_quiz = db.relationship("StudySetQuiz", back_populates='quiz') # relationship to studysetquiz

    def to_dict(self):
        return{
            "id": self.id,
            "user_id": self.user_id,
            "subject_id": self.subject_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
