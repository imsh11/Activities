from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        firstName='Demo', lastName='Lition', username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        firstName='Marnie', lastName='Smith',username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        firstName='Boobie', lastName='Brown', username='bobbie', email='bobbie@aa.io', password='password')
    stan = User(
        firstName='Stan',
        lastName='Smith',
        username='stan',
        email='stan@aa.io',
        password='password'
    )
    ston = User(
        firstName='Ston',
        lastName='Grey',
        username='ston',
        email='ston@aa.io',
        password='password'
    )
    kelly = User(
        firstName='Kelly',
        lastName='Tom',
        username='kelly',
        email='kelly@aa.io',
        password='password'
    )
    brain = User(
        firstName='Brain',
        lastName='Terry',
        username='brain',
        email='brian@aa.io',
        password='password'
    )
    jamie = User(
        firstName='Jamie',
        lastName='Turner',
        username='jamie',
        email='jamie@aa.io',
        password='password'
    )
    sara = User(
        firstName='Sara',
        lastName='Tom',
        username='sara',
        email='sara@aa.io',
        password='password'
    )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(stan)
    db.session.add(ston)
    db.session.add(kelly)
    db.session.add(brain)
    db.session.add(jamie)
    db.session.add(sara)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
