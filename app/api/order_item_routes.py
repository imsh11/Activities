from flask import Flask, Blueprint, session, request
from flask_login import login_required
from app.models.order_item import Order_Item

order_item_routes = Blueprint('items', __name__)

#get all items based on place
@order_item_routes.route('/place/<int:id>')
def getItemForPlace(id):
    print(id, '-------id')
    items = Order_Item.query.filter(Order_Item.place_id == id).all()

    print(dir(items[0]), items[0].place_id, '----------items')

    return { 'items': [item.to_dict_order_item() for item in items]}

@order_item_routes.route('/<int:id>')
def getItemById(id):
    print(id, type(id), '------------id')
    itemsById = Order_Item.query.get(id)

    print(dir(itemsById), '-----itemById')

    return { 'Item': itemsById.to_dict_order_item()}
