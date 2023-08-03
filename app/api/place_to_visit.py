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
@place_to_visit_routes.route('/place/<int:id>', methods=['POST'])
@login_required
def addPlace(id):
    """
    add place to list, using place.id
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

# update based on the id of the place_to_visit
@place_to_visit_routes.route('/<int:id>', methods=['PUT'])
@login_required
def updatePlaceList(id):
    selectedFromList = Place_To_Visit.query.get(id)
    print(selectedFromList, '------------selected')

    if not selectedFromList:
        return ({'Error': 'Could not be found'}), 404

    selectedFromList.status = request.json['status']
    db.session.commit()

    updated = Place_To_Visit.query.filter(Place_To_Visit.id == id).first()

    return updated.to_dict_place_to_visit()

@place_to_visit_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def place_to_visitDel(id):
    """
    Delete Review by Review.id and loggedIn User must have written the review
    Query for all reviews by the current user and returns them in a list of Review dictionaries
    ordered by updated_at
    """
    selectedToDelete = Place_To_Visit.query.get(id)

    db.session.delete(selectedToDelete)
    db.session.commit()

    return selectedToDelete.to_dict_place_to_visit()
