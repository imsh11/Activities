const GET_REVIEW_FOR_USER = 'activities/getReviewForUser'

const getReviews = (reviews) => {
    return{
        type: GET_REVIEW_FOR_USER,
        payload: reviews
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
        default:
            return state
    }
}

export default reviewReducer
