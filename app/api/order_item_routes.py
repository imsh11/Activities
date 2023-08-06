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
    checkCart = Cart_Order.query.filter(Cart_Order.user_id == int(session['_user_id']), Cart_Order.payment == False).all()

    print(checkCart, session['_user_id'], '----cart Session')
    # print(dir(checkCart[0]), '----dirCart')
    print(id, '-----id')

    if checkCart:
        form = Item_Order_Form()
        print(form)

        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            addItem = Order_Item

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

            return addItem.to_dict_order_item()

