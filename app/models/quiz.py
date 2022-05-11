from .db import db
from datetime import datetime

class Quiz(db.Model):
    __tablename__ = 'quizzes'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False) # references user id
    subject_id = db.Column(db.Integer, nullable=False) # references subject id
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def to_dict(self):
        return{
            "id": self.id,
            "user_id": self.user_id,
            "subject_id": self.subject_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
