from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin
from datetime import datetime

class Review(db.Model, UserMixin):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    review = db.Column(db.String(100), nullable=False)
    stars = db.Column(db.Float, nullable=False)
    place_id = db.Column(db.Integer, db.ForigenKey(add_prefix_for_prod('places.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForigenKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict_rev(self):
        return {
            'id': self.id,
            'review': self.review,
            'stars': self.stars,
            'place_id': self.place_id,
            'user_id': self.user_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
