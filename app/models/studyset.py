from .db import db
from datetime import datetime

class StudySet(db.Model):
    __tablename__ = 'studysets'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    study_set_id = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def to_dict(self):
        return{
            'id': self.id,
            'user_id': self.quiz_id,
            'study_set_id': self.study_set_id,
            'title': self.title,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
