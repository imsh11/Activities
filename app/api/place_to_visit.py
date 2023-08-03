from flask import Flask, Blueprint, jsonify, session, request
from flask_login import login_required
from app.models.place_to_visit import Place_To_Visit, db
from app.forms.add_place_to_visit_form import Add_place_to_visit

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

    return {"place_to_visit": [likedPlace.to_dict_place_to_visit() for likedPlace in likedPlaces]}

# add place to the places to visit
@place_to_visit_routes.route('/<int:id>', methods=['POST'])
@login_required
def addPlace(id):
    """
    add place to list
    """
    form = Add_place_to_visit()
    print(form,'-------form')
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        newPlace = Place_To_Visit(
            place_id = id,
            user_id = int(session['_user_id']),
            status = form.data['status']
        )
        print(newPlace, '------------new')
        db.session.add(newPlace)
        db.session.commit()

        return newPlace.to_dict_place_to_visit()
    return ({'Error': 'Please Try Again'}), 404
