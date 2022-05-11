from flask import Blueprint
from app.models import Subject

subject_routes = Blueprint('subjects', __name__)

@subject_routes.route('/')
def get_subjects():
    subjects = Subject.query.all()
    return {"subjects": [subject.to_dict() for subject in subjects]}
