from app.models import db, Place_To_Visit, environment, SCHEMA
from sqlalchemy.sql import text


def seed_places_to_visit():
    place1 = Place_To_Visit(
        place_id=1,
        user_id=3,
        status='really want to go to place 1 user 3'
    )
    place2 = Place_To_Visit(
        place_id=3,
        user_id=5,
        status='really want to go to place 3 user 5'
    )
    place3 = Place_To_Visit(
        place_id=2,
        user_id=2,
        status='really want to go to place 2 user 2'
    )

    db.session.add(place1)
    db.session.add(place2)
    db.session.add(place3)
    db.session.commit()


def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.places_to_visit RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM places_to_visit"))

    db.session.commit()
