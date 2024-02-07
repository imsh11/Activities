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
    // console.log(places, userReviews,user, '---------state')

    useEffect(() => {
        if(user){
            dispatch(getAllPlaces()).then(() => setIsLoaded(true))
            dispatch(getReviewsByUserId())
        }
    }, [dispatch, user])

    if(!Object.values(places).length){
        return(
            <div>loading...</div>
        )
    }

    //tabs
    const tabs = document.querySelectorAll("div.tab")
    
    const contents = document.querySelectorAll("div.content")
    // console.log(tabs, contents, '----testing')

    const removeActiveClass = () => {          //removing active class
        tabs.forEach( (t) => {
            t.classList.remove("active")
        })

        contents.forEach( (c) => {
            c.classList.remove("active")
        })
    }


    tabs.forEach( (t, i) => {                  //adding active class
        t.addEventListener("click", () => {
            removeActiveClass()
            contents[i].classList.add("active")
            t.classList.add("active")
        })
    })

    return(
        <>
        {user ? (
            <>
        {isLoaded &&(
            <div className="user-page tabs-container">
                <div className="tabs">
                    <div className="tab active">
                        My INFO
                    </div>
                    <div className="tab">
                        Reviews
                    </div>
                    <div className="tab">
                        Order History
                    </div>
                </div>
                <div className="content-container">
                    <div className="user-main content active">
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
                    <div className="Reviews content">
                        <div className="title">Reviews</div>
                        <div>
                            {userReviews.length?
                            <div>
                                {userReviews.map(review => (
                                    <div key={review.id} className="review-content">
                                        <div className="review-img">
                                            {/* {console.log(review.place_id, places,'testing undef error---------')} */}
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
                    <div className="History content">
                        <OrderHistoryByUserId />
                    </div>
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
