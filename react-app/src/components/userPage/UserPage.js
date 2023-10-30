import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviewsByUserId } from "../../store/review";
import UserImg from "../../images/User-Profile-PNG-Image.png"
import "./UserPage.css"
import { getAllPlaces } from "../../store/places";
import DeleteReviewId from "../ReviewDelete/DeleteReview";
import OrderHistoryByUserId from "../orderHistory/OrderHistory";
import { Redirect } from "react-router-dom/cjs/react-router-dom";

const UserInfoPage = () => {

    const dispatch = useDispatch()

    const [isLoaded, setIsLoaded] = useState(false)

    const user = useSelector(state => state.session.user)
    const userReviews = useSelector(state => Object.values(state.reviews))
    const places = useSelector(state => state.places)
    console.log(places, userReviews,user, '---------state')

    useEffect(() => {
        if(user){
            dispatch(getAllPlaces())
            dispatch(getReviewsByUserId()).then(() => setIsLoaded(true))
        }
    }, [dispatch, user])

    if(!Object.values(places).length || !userReviews){
        return(
            <div>loading...</div>
        )
    }

    return(
        <>
        {user ? (
            <>
        {isLoaded &&(
            <div className="user-page">
                <div className="user-main">
                    <div className="imageContainer">
                        <img className="basicUserProfile" src={UserImg} alt="profile" />
                    </div>
                    <div className="userDetail">
                        <div className="user-email">
                            Email: {user.email}
                        </div>
                        <div className="user-email">
                            Name: {user.lastname}, {user.firstname}
                        </div>
                        <div className="user-email">
                            Username: {user.username}
                        </div>
                    </div>
                </div>
                <div className="Reviews">
                    <div className="title">Reviews</div>
                    <div>
                        {userReviews.length?
                        <div>
                            {userReviews.map(review => (
                                <div key={review.id} className="review-content">
                                    <div className="review-img">
                                        <img className="placeImg" src={places[review.place_id].img1}
                                        alt="placeImg" />
                                    </div>
                                    <div className="review-container">
                                        <div className="reviewBody">
                                            Review: {review.review}
                                        </div>
                                        <div className="reviewBody">
                                            Rating: {review.stars}
                                        </div>
                                        <div className="reviewBody">
                                            Place: {places[review.place_id].name}
                                        </div>
                                        <div className="reviewBody">
                                            <DeleteReviewId id={review.id} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        :
                        <div style={{}} className="No-Reviews">
                            You haven't left any Reviews
                        </div>
                        }
                    </div>
                </div>
                <div className="History">
                    <OrderHistoryByUserId />
                </div>
            </div>
        )}
        </>
        ) : (
            <Redirect to='/' />
        )}
        </>
    )
}

export default UserInfoPage
