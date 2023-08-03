from flask import Flask, Blueprint, jsonify, session
from flask_login import login_required
from app.models.place_to_visit import Place_To_Visit, db

place_to_visit_routes = Blueprint('placesToVisit', __name__)

# get all the places from places to visit
@place_to_visit_routes.route('/placeList')
@login_required
def placesToVisit():

    user_idd = int(session['_user_id'])
    # print(session, dir(session), session['_user_id'], type(int(session['_user_id'])), type(user_id), '------------session')
    # print(dir(Place_To_Visit), Place_To_Visit.id, '---------type')
    print(user_idd, '---------userID')
    likedPlaces = Place_To_Visit.query.filter(Place_To_Visit.user_id == user_idd).all()
    print(likedPlaces, '--------liked')

    return {"tset": [likedPlace.to_dict_place_to_visit() for likedPlace in likedPlaces]}
