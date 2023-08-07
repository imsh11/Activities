from flask import Flask, Blueprint, jsonify, session, request
from flask_login import login_required
from app.models.place import Place, db
from app.models.review import Review

place_routes = Blueprint('place', __name__)

# get all places
@place_routes.route('/allPlaces')
def allPlaces():

    places = Place.query.all()
    # print(places, places[0].name, places[0].order_place[0], 'testing----')
    # print(dir(places), '------------dir')

    return {'Places': [place.to_dict_place() for place in places]}

# get detail for a place by place id
@place_routes.route('/<int:id>')
def placeDetail(id):
    selected = Place.query.get(id)

    # print(id, selected, dir(selected), '-------------seleID')
    # print(selected.place_for_review, '---------review')

    if not selected:
        return ({ 'Error': 'Place does not exist'}), 404

    selectedReviews = selected.place_for_review
    selectedOrderItems = selected.order_place
    # print(selectedReviews, selectedOrderItems, '----------review')

    return {'Place': selected.to_dict_place(),
            'Reviews': [review.to_dict_review() for review in selectedReviews],
            'OrderItems': [item.to_dict_order_item() for item in selectedOrderItems]
            }
