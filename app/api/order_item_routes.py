from flask import Flask, Blueprint, session, request
from flask_login import login_required
from app.models.order_item import Order_Item
from app.models.cart_order import Cart_Order, db
from app.forms.order_item_form import Item_Order_Form

order_item_routes = Blueprint('order', __name__)

#get all orders based on place id
@order_item_routes.route('/place/<int:id>')
def getItemForPlace(id):
    print(id, '-------id')
    items = Order_Item.query.filter(Order_Item.place_id == id).all()

    print(dir(items[0]), items[0].place_id, '----------items')
    for it in items:
        print(it.order_item_for_place, dir(it.order_item_for_place), '===looop')

    return { 'Order': [item.to_dict_order_item() for item in items]}

#get all order based on id
@order_item_routes.route('/<int:id>')
def getItemById(id):
    print(id, type(id), '------------id')
    itemsById = Order_Item.query.get(id)

    print(dir(itemsById), '-----itemById')

    return { 'Order': itemsById.to_dict_order_item()}


# add items to cart via place id
@order_item_routes.route('/place/<int:id>', methods=['POST'])
@login_required
def addToCart(id):
    checkCart = Cart_Order.query.filter(Cart_Order.user_id == int(session['_user_id']), Cart_Order.payment == False).first()

    print(checkCart, session['_user_id'], '----cart Session')
    print(dir(checkCart), '----dirCart')
    print(id, '-----id')

    if checkCart:
        form = Item_Order_Form()
        # print(form)

        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            addItemCart = Order_Item(
                place_id= id,
                user_id= int(session['_user_id']),
                quantity= form.data['quantity'],
                cart_order_id= checkCart.id
            )

            # print(form.data['quantity'], type(form.data['quantity']), '-------type form')

            db.session.add(addItemCart)
            db.session.commit()



            return {
                'Item': addItemCart.to_dict_order_item()
            }


    elif not checkCart:
        createCart = Cart_Order(
            user_id= int(session['_user_id']),
            payment = False
        )

        print(createCart.to_dict_cart_order())
        db.session.add(createCart)
        db.session.commit()

        form = Item_Order_Form()

        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            addItem = Order_Item(
                place_id= id,
                user_id= int(session['_user_id']),
                quantity= form.data['quantity'],
                cart_order_id= createCart.id
            )

            print(addItem, '--------add item')
            db.session.add(addItem)
            db.session.commit()

            return {
                'Item': addItem.to_dict_order_item()
                }

# changing the quantity using order_item id
@order_item_routes.route('/<int:id>', methods=['PUT'])
@login_required
def updateQuantity(id):
    """
    updating based on order item id
    restrictions - login required, user must match the user on the item

    suggestions
    when quantity less than 1 delete
    strong query, checks for incomplete order through cart
    """

    orderItem = Order_Item.query.get(id)
    print(orderItem, dir(orderItem), orderItem.user_id, type(orderItem.user_id),'orderItem')

    if orderItem.user_id != int(session['_user_id']):
        return ({
            'Error': 'Not authorized'
        }), 404

    orderItem.quantity = request.json['quantity']

    if orderItem.quantity < 1 or orderItem.quantity > 10:
        return {
            'Error': 'Quantity can not be below 1 or exceed 10'
        }


    db.session.commit()

    updatedOrder = Order_Item.query.get(id)

    return {
        'Item': updatedOrder.to_dict_order_item()
    }

# deleteing order item based on order id
@order_item_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delByOrderId(id):
    """

    """

    itemDel = Order_Item.query.get(id)

    print(itemDel, '--------item')

    if itemDel.user_id != int(session['_user_id']):
        return ({
            'Error': 'Not authorized'
        }), 404

    if not itemDel:
        return {
            'Error': 'Item does not exist'
        }
    else:
        db.session.delete(itemDel)
        db.session.commit()
        return itemDel.to_dict_order_item()
