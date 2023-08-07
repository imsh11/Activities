from app.models import db, Cart_Order, environment, SCHEMA
from sqlalchemy.sql import text


def seed_cart_orders():
    cart1 = Cart_Order(
        user_id=1,
        payment=True
    )
    cart2 = Cart_Order(
        user_id=2,
        payment=True
    )
    cart3 = Cart_Order(
        user_id=3,
        payment=True
    )
    cart4 = Cart_Order(
        user_id=4,
        payment=True
    )

    db.session.add(cart1)
    db.session.add(cart2)
    db.session.add(cart3)
    db.session.add(cart4)
    db.session.commit()


def undo_cart_orders():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cart_order RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM cart_order"))

    db.session.commit()
