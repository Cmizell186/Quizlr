from .db import db


class Subject(db.Model):
    __tablename__ = 'subjects'

    id = db.Column(db.Integer, primary_key=True)
    subject = db.Column(db.String, nullable=False, unique=True)

    quiz = db.relationship("Quiz", back_populates='subject')

    def to_dict(self):
        return{
            'id': self.id,
            'title': self.title,
            'subject': self.subject,
        }
