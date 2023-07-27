from app.models import db, Order_Item, environment, SCHEMA
from sqlalchemy.sql import text


def seed_order_items():
    order1 = Order_Item(
        place_id=1,
        user_id=1,
        price=10,
        quantity=1,
        cart_order_id=1,
        description= 'place 1 user 1 price 10'
    )
    order2 = Order_Item(
        place_id=2,
        user_id=2,
        price=20,
        quantity=1,
        cart_order_id=2,
        description= 'place 2 user 2 price 20'
    )
    order3 = Order_Item(
        place_id=3,
        user_id=3,
        price=30,
        quantity=1,
        cart_order_id=3,
        description= 'place 3 user 3 price 30'
    )
    order4 = Order_Item(
        place_id=3,
        user_id=4,
        price=30,
        quantity=1,
        cart_order_id=4,
        description= 'place 3 user 3 price 30'
    )

    db.session.add(order1)
    db.session.add(order2)
    db.session.add(order3)
    db.session.add(order4)
    db.session.commit()





def undo_order_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.order_item RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM order_item"))

    db.session.commit()
