from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin
from datetime import datetime

class Place_To_Visit(db.Model, UserMixin):
    __tablename__ = 'places_to_visit'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    place_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('places.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    status = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    places_add_by_user = db.relationship('Place', foreign_keys='Place_To_Visit.place_id',back_populates='place_to_visit')
    user_places = db.relationship('User', foreign_keys='Place_To_Visit.user_id', back_populates='places')

    def to_dict_place_to_visit(self):
        return {
            'id': self.id,
            'place_id': self.place_id,
            'user_id': self.user_id,
            'status': self.status,
            'created_at': self.created_at,
            'updated_at':self.updated_at
        }

