from flask import Flask, Blueprint, session, request, jsonify
from flask_login import login_required
from app.models.cart_order import Cart_Order, db
import json

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
    # print(userCarts, dir(userCarts[0]), '-----cart')

    total = 0
    itemsList = []
    ItemsInCart = 0
    place = {}

    for usercart in userCarts:
        # print(usercart.cart, dir(usercart.cart), '---------cart')
        # print(usercart, '-------------cartUser')

        for item in usercart.cart:
            # print(item, dir(item), item.order_item_for_place.price, item.order_item_for_place.product, '---------item')
            # print(item.quantity, '-------quantity')
            # place['Place Name']=  item.order_item_for_place.name


            itemsList.append(item)
            # itemsList.append(place)

            ItemsInCart += 1
            total += item.quantity * item.order_item_for_place.price

    # print(itemsList, '---------total')

    return { 'CurrentOrder': [userCart.to_dict_cart_order() for userCart in userCarts],
            'Items': [singleItem.to_dict_order_item() for singleItem in itemsList],
            'ItemsInCart': ItemsInCart,
            'Total': total
            }

# get cart order history
@cartOrder.route('/history')
@login_required
def cartHis():
    oldCarts = Cart_Order.query.filter(Cart_Order.user_id == int(session['_user_id']), Cart_Order.payment == True).all()
    order = {}

    for oldcart in oldCarts:
        order[oldcart.id] = oldcart.to_dict_cart_order()
        order[oldcart.id]['items'] = [items.to_dict_order_item() for items in oldcart.cart]

        # for items in oldcart.cart:
        #     order['item']= items.to_dict_order_item()

    # print(oldCarts[2].cart, oldCarts, dir(oldCarts[1].cart[0]), order, '-----------his')
    # print ([oldCart.to_dict_cart_order() for oldCart in oldCarts])
    print(oldCarts, '--------order')
    return {
        'OrderHistory': order
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
        # print(checkCart, cartCreated, '------------cart')

        return cartCreated.to_dict_cart_order()
    return ({'Error': 'Something went wrong'}), 404

# to update payment
@cartOrder.route('/payment', methods=['PUT'])
@login_required
def payment():
    '''

    '''
    updatePay = Cart_Order.query.filter(Cart_Order.user_id == int(session['_user_id']), Cart_Order.payment == False).first()

    # print(updatePay, dir(updatePay), '---------updatePay')
    # print(type(updatePay.user_id), '----------type')
    # print(updatePay.payment , '---------payment')

    if not updatePay:
        return ({
            'Error': 'Nothing to update'
        })

    if updatePay.user_id != int(session['_user_id']):
        return ({
            'Error': 'User in not authorized'
        }), 404

    updatePay.payment = True

    db.session.commit()

    updated = Cart_Order.query.get(updatePay.id)
    # print(updated, '-----upd')

    return {
        'updated': updated.to_dict_cart_order()
    }

# delete cart paid order
@cartOrder.route('/delete/<int:id>', methods=['DELETE'])
@login_required
def deleteOldOrder(id):
    oldOrders = Cart_Order.query.filter(Cart_Order.user_id == int(session['_user_id']), Cart_Order.payment == True, Cart_Order.id == id).first()

    print(oldOrders, '---------del cart')

    if not oldOrders:
        return({
            "Error": "Cart Does not exist"
        }), 404

    db.session.delete(oldOrders)
    db.session.commit()

    return oldOrders.to_dict_cart_order()
