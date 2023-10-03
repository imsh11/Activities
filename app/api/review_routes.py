from flask import Flask, Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import Review, db
from ..forms.review_form import Review_Form

review_routes = Blueprint('review', __name__)

# get all for user logged in review
@review_routes.route('/userReview')
@login_required
def userReview():

    reviewsFromUser = Review.query.filter(Review.user_id == current_user.id).all()

    # used current_user to get user id could have used session, below
    # print(dir(reviewsFromUser), current_user.id, type(session['_user_id']),'-------session')

    return { 'Reviews': [review.to_dict_review() for review in reviewsFromUser]}

# can create route to get reviews based on place id but already exists


# add review based on place id
@review_routes.route('/place/<int:id>', methods=['POST'])
@login_required
def addReview(id):
    form = Review_Form()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        newReview = Review(
            place_id = id,
            user_id = int(session['_user_id']),
            review = form.data['review'],
            stars = form.data['stars']
        )

        # print(newReview, '------newReview')
        db.session.add(newReview)
        db.session.commit()

        return newReview.to_dict_review()
    return ({'Error': 'Please Try Again'}), 404


# delete review base on review id
@review_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def deleteReview(id):

    reviewDel = Review.query.get(id)

    if not reviewDel:
        return ({ 'Error': 'Review Does NOT Exist'}), 404

    print(dir(reviewDel), reviewDel.user_id ,session['_user_id'], '----del----')

    if reviewDel.user_id != int(session['_user_id']):
        return ({ 'Error': 'Unauthorized'}), 401

    db.session.delete(reviewDel)
    db.session.commit()

    return ({ 'Message': 'Review Deleted Successfully'})
