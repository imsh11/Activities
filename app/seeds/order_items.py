from app.models import db, Order_Item, environment, SCHEMA
from sqlalchemy.sql import text


def seed_order_items():
    order1 = Order_Item(
        place_id=1,
        quantity=1,
        cart_order_id=1,
    )
    order2 = Order_Item(
        place_id=2,
        quantity=1,
        cart_order_id=2,
    )
    order3 = Order_Item(
        place_id=3,
        quantity=1,
        cart_order_id=3,
    )

    db.session.add(order1)
    db.session.add(order2)
    db.session.add(order3)
    db.session.commit()





def undo_order_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.order_item RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM order_item"))

    db.session.commit()
