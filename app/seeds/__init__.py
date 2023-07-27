from flask.cli import AppGroup
from .users import seed_users, undo_users
from .places import seed_places, undo_places
from .reviews import seed_reviews, undo_reviews
from .places_to_visit import seed_places_to_visit, undo_places_to_visit
from .cart_orders import seed_cart_orders, undo_cart_orders
from .order_items import seed_order_items, undo_order_items

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_places()
        undo_reviews()
        undo_places_to_visit()
        undo_cart_orders()
        undo_order_items()
    seed_users()
    seed_places()
    seed_reviews()
    seed_places_to_visit()
    seed_cart_orders()
    seed_order_items()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_places()
    undo_reviews()
    undo_places_to_visit()
    undo_cart_orders()
    undo_order_items()
    # Add other undo functions here
