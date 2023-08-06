from flask import Flask, Blueprint, session, request
from flask_login import login_required
from app.models.cart_order import Cart_Order, db

cartOrder = Blueprint('cart', __name__)

# get cart in session based on user id
@cartOrder.route('/user/current/<int:userId>')
@login_required
def getCartForUser(userId):
    """
    get cart base on user id
    """
    # print(userId, type(userId), '----userId')

    userCarts = Cart_Order.query.filter(Cart_Order.user_id == userId, Cart_Order.payment == False).all()
    print(userCarts, dir(userCarts[0]), '-----cart')

    total = 0
    itemsList = []
    ItemsInCart = 0
    place = {}

    for usercart in userCarts:
        # print(usercart.cart, dir(usercart.cart), '---------cart')
        print(usercart, '-------------cartUser')

        for item in usercart.cart:
            print(item, dir(item), item.order_item_for_place.price, item.order_item_for_place.product, '---------item')
            print(item.quantity, '-------quantity')
            # place['Place Name']=  item.order_item_for_place.name


            itemsList.append(item)
            # itemsList.append(place)

            ItemsInCart += 1
            total += item.quantity * item.order_item_for_place.price

    print(itemsList, '---------total')

    return { 'Current Order': [userCart.to_dict_cart_order() for userCart in userCarts],
            'Items': [singleItem.to_dict_order_item() for singleItem in itemsList],
            'Items in Cart': ItemsInCart,
            'Total': total
            }

# get cart order history
@cartOrder.route('/history/<int:userId>')
@login_required
def cartHis(userId):
    oldCarts = Cart_Order.query.filter(Cart_Order.user_id == userId, Cart_Order.payment == True).all()
    print(oldCarts, '-----------his')

    return {
        'Order History': [cart.to_dict_cart_order() for cart in oldCarts]
    }

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

