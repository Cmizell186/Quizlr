from .db import db


class Subject(db.Model):
    __tablename__ = 'subjects'

    id = db.Column(db.Integer, primary_key=True)
    subject = db.Column(db.String, nullable=False, unique=True)

    def to_dict(self):
        return{
            'id': self.id,
            'subject': self.subject,
        }
