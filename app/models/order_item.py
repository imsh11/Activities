from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin
from datetime import datetime

class Order_Item(db.Model, UserMixin):
    __tablename__ = 'order_item'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    place_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('places.id')), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    cart_order_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('cart_order.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    order_item_for_place = db.relationship('Place', foreign_keys='Order_Item.place_id', back_populates='order_place')
    cart_order = db.relationship('Cart_Order', foreign_keys='Order_Item.cart_order_id', back_populates='cart')

    def to_dict_order_item(self):
        return {
            'id': self.id,
            'place_id': self.place_id,
            'quantity': self.quantity,
            'cart_order_id': self.cart_order_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
