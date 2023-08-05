from flask import Flask, Blueprint, session, request
from flask_login import login_required
from app.models.order_item import Order_Item
from app.models.cart_order import Cart_Order
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

# post
# @order_item_routes.route('/items')

# add items to cart
@order_item_routes.route('/<int:id>', methods=['POST'])
@login_required
def addToCart(id):
    checkCart = Cart_Order.query.filter(Cart_Order.user_id == int(session['_user_id']), Cart_Order.payment == False).all()

    print(checkCart, dir(checkCart[0]), '----cart')

    if checkCart:
        form = Item_Order_Form()
        print(form)

        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            addItem = Order_Item

