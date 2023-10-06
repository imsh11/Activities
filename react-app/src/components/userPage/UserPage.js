import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviewsByUserId } from "../../store/review";
import UserImg from "../../images/User-Profile-PNG-Image.png"
import "./UserPage.css"
import { getAllPlaces } from "../../store/places";
import DeleteReviewId from "../ReviewDelete/DeleteReview";
import OrderHistoryByUserId from "../orderHistory/OrderHistory";

const UserInfoPage = () => {

    const dispatch = useDispatch()

    const [isLoaded, setIsLoaded] = useState(false)

    const user = useSelector(state => state.session.user)
    const userReviews = useSelector(state => Object.values(state.reviews))
    const places = useSelector(state => state.places)
    console.log(places, '---------state')

    useEffect(() => {
        dispatch(getAllPlaces())
        dispatch(getReviewsByUserId()).then(() => setIsLoaded(true))
    }, [dispatch, user])

    return(
        <>
        {isLoaded &&(
            <div>
                <div className="user-main">
                    <div className="imageContainer">
                        <img className="basicUserProfile" src={UserImg} alt="profile" />
                    </div>
                    <div className="userDetail">
                        <div>
                            Email: {user.email}
                        </div>
                        <div>
                            Name: {user.lastname}, {user.firstname}
                        </div>
                        <div>
                            Username: {user.username}
                        </div>
                    </div>
                </div>
                <div>
                    Reviews
                    <div>
                        {userReviews.map(review => (
                            <div key={review.id}>
                                <div>
                                    <img className="" src={places[review.place_id].img1}
                                    alt="placeImg" />
                                </div>
                                <div>
                                    Review: {review.review}
                                </div>
                                <div>
                                    Rating: {review.stars}
                                </div>
                                <div>
                                    Place: {places[review.place_id].name}
                                </div>
                                <div>
                                    <DeleteReviewId id={review.id} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <OrderHistoryByUserId />
                </div>
            </div>
        )}
        </>
    )
}

export default UserInfoPage
