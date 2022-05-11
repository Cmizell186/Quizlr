from .db import db
from datetime import datetime

class FlashCard(db.Model):
    __tablename__ = 'flashcards'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    quiz_id = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    quiz = db.relationship("Quiz", back_populates='flashcard') # relationship to quiz
    user = db.relationship("User", back_populates='flashcard') # relationship to user

    def to_dict(self):
        return{
            'id': self.id,
            "user_id": self.user_id,
            'quiz_id': self.quiz_id,
            'description': self.description,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
