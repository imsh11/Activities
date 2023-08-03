from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin
from datetime import datetime

class Cart_Order(db.Model, UserMixin):
    __tablename__ = 'cart_order'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    total = db.Column(db.Float, nullable=False)
    payment = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    cart = db.relationship('Order_Item', foreign_keys='Order_Item.cart_order_id', back_populates='cart_order', cascade='all, delete-orphan')
    user_cart = db.relationship('User', foreign_keys='Cart_Order.user_id', back_populates='cart')

    def to_dict_cart_order(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'total': self.total,
            'payment': self.payment,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
