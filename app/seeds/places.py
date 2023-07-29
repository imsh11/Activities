from app.models import db, Place, environment, SCHEMA
from sqlalchemy.sql import text


def seed_places():
    five_flags = Place(
        name='five flags',
        address='123 test lane',
        city='New York City',
        state='New York',
        activity_type='roller coster rides'
    )
    dorne_park = Place(
        name='Dorne Park',
        address='123 test lane',
        city='Jersey City',
        state='New Jersey',
        activity_type='water park'
    )
    bronx_zoo = Place(
        name='Bronx Zoo',
        address='123 abc lane',
        city='Bronx',
        state='New York',
        activity_type='zoo'
    )

    db.session.add(five_flags)
    db.session.add(dorne_park)
    db.session.add(bronx_zoo)
    db.session.commit()


def undo_places():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.places RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM places"))

    db.session.commit()
