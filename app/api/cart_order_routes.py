from flask import Flask, Blueprint, session, request
from flask_login import login_required
from app.models.cart_order import Cart_Order

cartOrder = Blueprint('cart', __name__)

# get a cart based on user id
@cartOrder.route('/<int:userId>')
def getCartForUser(userId):
    """
    get cart base on user id
    """
    print(userId, type(userId), '----userId')

    userCarts = Cart_Order.query.filter(Cart_Order.user_id == userId).all()
    print(userCarts, '-----cart')

    return { 'Order History': [userCart.to_dict_cart_order() for userCart in userCarts]}
