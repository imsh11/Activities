from flask import Flask, Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import Review

review_routes = Blueprint('review', __name__)

# get all for user logged in review
@review_routes.route('/userReview')
def userReview():

    reviewsFromUser = Review.query.filter(Review.user_id == current_user.id).all()
    print(reviewsFromUser, current_user.id, type(current_user.id),'-------session')

    return { 'Reviews': [review.to_dict_review() for review in reviewsFromUser]}
