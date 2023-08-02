from flask import Flask, Blueprint, jsonify, session, request
from flask_login import login_required
from app.models.place import Place, db
from app.models.review import Review

place_routes = Blueprint('place', __name__)

# get all places
@place_routes.route('/allPlaces')
def allPlaces():

    # places = Place.query.all()
    places = Review.query.join(Place).all()
    # places = db.session.query(Place).join(Review).all()
    # print(dir(places[0]), places[0].name, places[0].order_place[0], 'testing----')
    # print(dir(places[0].order_place[0]), '------------dir')
    print(places, '-----------places')
    print(places[0], '-------review')
    for place in places:
        print(place.to_dict_review(), '------place')
        test = Place.query.get(place.place_id)
        print(test.to_dict_place())

    return {'Places': [place.to_dict_review() for place in places]}
    # return 'hello'
