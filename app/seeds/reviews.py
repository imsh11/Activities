from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text


def seed_reviews():
    review1 = Review(
        review='we had a lot of fun, rides were great',
        stars=4,
        place_id=1,
        user_id=1,
    )
    review2 = Review(
        review='it was an awesome hangout with friends',
        stars=5,
        place_id=1,
        user_id=2,
    )
    review3 = Review(
        review='place needs cleaning, the food was not good',
        stars=3,
        place_id=3,
        user_id=1,
    )
    review4 = Review(
        review='i was here with my friends, rides were great',
        stars=5,
        place_id=2,
        user_id=4,
    )
    review5 = Review(
        review='it was very crowded, we waited in long lines for every ride',
        stars=2,
        place_id=1,
        user_id=5,
    )

    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)
    db.session.commit()



def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
