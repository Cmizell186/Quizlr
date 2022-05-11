from .db import db
from datetime import datetime

class StudySetQuiz(db.Model):
    __tablename__ = 'studysetquizzes'

    id = db.Column(db.Integer, primary_key=True)
    quiz_id = db.Column(db.Integer, nullable=False)
    study_set_id = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    quiz = db.relationship("Quiz", back_populates='study_set') # relationship to quiz
    study_set = db.relationship("StudySet", back_populates='study_quiz') # relationship to study set
    def to_dict(self):
        return{
            'id': self.id,
            'user_id': self.quiz_id,
            'study_set_id': self.study_set_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
