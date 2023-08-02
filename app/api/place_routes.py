from flask import Flask, Blueprint, jsonify, session, request
from flask_login import login_required
from app.models.place import Place, db
from app.models.review import Review

place_routes = Blueprint('place', __name__)

# get all places
@place_routes.route('/allPlaces')
def allPlaces():

    places = Place.query.all()
    print(places, places[0].name, places[0].order_place[0], 'testing----')
    # print(dir(places), '------------dir')

    return {'Places': [place.to_dict_place() for place in places]}


@place_routes.route('/<int:id>')
def placeDetail(id):
    selected = Place.query.get(id)

    print(id, selected, '-------------seleID')

    if not selected:
        return ({ 'Error': 'Place does not exist'}), 404

    return selected.to_dict_place()
