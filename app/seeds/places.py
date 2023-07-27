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
