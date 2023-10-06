const GET_REVIEW_FOR_USER = 'activities/getReviewForUser'
const DELETE_REVIEW_ID = 'activities/delReviewByRevId'

const getReviews = (reviews) => {
    return{
        type: GET_REVIEW_FOR_USER,
        payload: reviews
    }
}

const delReview = (reviewDel) => {
    return{
        type: DELETE_REVIEW_ID,
        payload: reviewDel
    }
}

export const getReviewsByUserId = () => async (dispatch) => {

    const response = await fetch('/api/review/userReview')
    console.log(response, '-------review')

    if(response.ok){
        const data = await response.json()
        console.log(data, '--------fetch response')

        dispatch(getReviews(data))
        return data
    }
}

export const delReviwByReviewId = (id) => async (dispatch) => {

    const response = await fetch(`/api/review/${id}`, {
        method: "DELETE"
    })
    console.log(response, '--------delReview')

    if(response.ok){
        const data = await response.json()
        console.log(data, '--------dataDelREV')

        dispatch(delReview(data))
    }
}

//state
const initialState = {}

const reviewReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_REVIEW_FOR_USER: {
            const newState = {}

            console.log(action.payload.Reviews, '----state get reviews')
            action.payload.Reviews.forEach((review) => {
                newState[review.id] = review
            })
            return newState
        }
        case DELETE_REVIEW_ID:{
            const newState = {...state}

            console.log(action.payload, '------DelAction')

            delete newState[action.payload.id]
            return newState
        }
        default:
            return state
    }
}

export default reviewReducer
