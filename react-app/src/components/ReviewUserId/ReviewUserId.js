import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviewsByUserId } from "../../store/review";

const ReviewByUserId = () => {

    const dispatch = useDispatch()

    const [isLoaded, setIsLoaded] = useState(false)

    const userReviews = useSelector(state => Object.values(state.reviews))
    const user = useSelector(state => state.session.user)
    // console.log(userReviews, '-----review compo')

    useEffect(() => {
        dispatch(getReviewsByUserId()).then(() => setIsLoaded(true))
    }, [dispatch, user])

    return(
        <>

        <div>
            Reviews
        </div>
        <div>
            {userReviews.map( review => (
                <div key={review.id}>
                <div>
                    Review: {review.review}
                </div>
                <div>
                    Rating: {review.stars}
                </div>
                </div>
            ))}
        </div>
        </>
    )
}

export default ReviewByUserId
