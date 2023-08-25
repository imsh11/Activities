from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin
from datetime import datetime

class Place(db.Model, UserMixin):
    __tablename__ = 'places'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    address = db.Column(db.String(50), nullable=False)
    city = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(50), nullable=False)
    product = db.Column(db.String(50), nullable=False)
    price = db.Column(db.Float, nullable=False)
    img1 = db.Column(db.String(), nullable=False)
    img2 = db.Column(db.String(), nullable=False)
    img3 = db.Column(db.String(), nullable=False)
    img4 = db.Column(db.String(), nullable=False)
    img5 = db.Column(db.String(), nullable=False)
    activity_type = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.String(50), default=datetime.utcnow)
    updated_at = db.Column(db.String(50), default=datetime.utcnow)

    order_place = db.relationship('Order_Item', foreign_keys='Order_Item.place_id', back_populates='order_item_for_place', cascade='all, delete-orphan')
    place_for_review = db.relationship('Review', foreign_keys='Review.place_id', back_populates='place_reviewed', cascade='all, delete-orphan')
    place_to_visit = db.relationship('Place_To_Visit', foreign_keys='Place_To_Visit.place_id', back_populates='places_add_by_user', cascade='all, delete-orphan')

    def to_dict_place(self):
        return {
            'id': self.id,
            'name': self.name,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'product': self.product,
            'price': self.price,
            'img1': self.img1,
            'img2': self.img2,
            'img3': self.img3,
            'img4': self.img4,
            'img5': self.img5,
            'activity_type': self.activity_type,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
