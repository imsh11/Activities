from flask import Flask, Blueprint, session, request
from flask_login import login_required
from app.models.cart_order import Cart_Order, db

cartOrder = Blueprint('cart', __name__)

# get a cart based on user id
@cartOrder.route('/user/<int:userId>')
@login_required
def getCartForUser(userId):
    """
    get cart base on user id
    """
    # print(userId, type(userId), '----userId')

    userCarts = Cart_Order.query.filter(Cart_Order.user_id == userId).all()
    # print(userCarts, dir(userCarts[0]), '-----cart')
    for usercart in userCarts:
        print(usercart.cart, dir(usercart.cart), '---------cart')

        for item in usercart.cart:
            print(item, dir(item), '---------item')

    return { 'Order History': [userCart.to_dict_cart_order() for userCart in userCarts]}

# post req in cart
@cartOrder.route('/new', methods=['POST'])
@login_required
def newCart():
    """_summary_ new cart
    - check if cart exists
    - check if user exists
    """
    user = session

    # query based on user Id and payment
    checkCart = Cart_Order.query.filter(Cart_Order.user_id == int(user['_user_id']), Cart_Order.payment == False).all()

    if not checkCart:
        cartCreated = Cart_Order(
            user_id = int(user['_user_id']),
            payment = False
        )

        db.session.add(cartCreated)
        db.session.commit()

        # print(user, user['_user_id'], type(user['_user_id']), '----------userCart')
        print(checkCart, cartCreated, '------------cart')

        return cartCreated.to_dict_cart_order()
    return ({'Error': 'Something went wrong'}), 404

