from app.models import db, Place, environment, SCHEMA
from sqlalchemy.sql import text


def seed_places():
    five_flags = Place(
        name='five flags',
        address='123 test lane',
        city='New York City',
        state='New York',
        product= 'one day ticket',
        price= 10,
        activity_type='roller coster rides'
    )
    dorne_park = Place(
        name='Dorne Park',
        address='123 test lane',
        city='Jersey City',
        state='New Jersey',
        product= 'one day ticket',
        price= 40,
        activity_type='water park'
    )
    bronx_zoo = Place(
        name='Bronx Zoo',
        address='123 abc lane',
        city='Bronx',
        state='New York',
        product= 'one day ticket',
        price= 50,
        activity_type='zoo'
    )
    place1 = Place(
        name='Natural History Museum',
        address='321 testing lane',
        city='Manhattan',
        state='New York',
        product= 'one day ticket',
        price= 60,
        activity_type='museum'
    )
    place2 = Place(
        name='Splish Splash',
        address='123 test lane',
        city='Long Island',
        state='New York',
        product= 'one day ticket',
        price= 60,
        activity_type='water park'
    )
    place3 = Place(
        name='New York Aquarium',
        address='602 abbbc lane',
        city='Brooklyn',
        state='New York',
        product= 'one day ticket',
        price= 50,
        activity_type='aqurium'
    )

    db.session.add(five_flags)
    db.session.add(dorne_park)
    db.session.add(bronx_zoo)
    db.session.add(place1)
    db.session.add(place2)
    db.session.add(place3)
    db.session.commit()


def undo_places():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.places RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM places"))

    db.session.commit()
