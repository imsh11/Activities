const GET_REVIEW_FOR_USER = 'activities/getReviewForUser'
const DELETE_REVIEW_ID = 'activities/delReviewByRevId'
const ADD_REVIEW_BY_PLACE_ID = 'acitivities/addReviewByPlaceId'
const GET_ALL_REVIEWS = 'activities/getAllReviews'

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

const addReview = (newReview) => {
    return{
        type: ADD_REVIEW_BY_PLACE_ID,
        payload: newReview
    }
}

const allReviews = (getAllRev) => {
    return{
        type: GET_ALL_REVIEWS,
        payload: getAllRev
    }
}

export const getReviewsByUserId = () => async (dispatch) => {

    const response = await fetch('/api/review/userReview')
    // console.log(response, '-------review')

    if(response.ok){
        const data = await response.json()
        // console.log(data, '--------fetch response')

        dispatch(getReviews(data))
        return data
    }
}

export const delReviwByReviewId = (id) => async (dispatch) => {

    const response = await fetch(`/api/review/${id}`, {
        method: "DELETE"
    })
    // console.log(response, '--------delReview')

    if(response.ok){
        const data = await response.json()
        // console.log(data, '--------dataDelREV')

        dispatch(delReview(data))
    }
}

export const createNewReviewByPlaceId = (content, id) => async (dispatch) => {
    // console.log(content, id, '----------createReview')
    const response = await fetch(`/api/review/place/${id}`, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(content)
    })

    // console.log(response, '--------response')

    if(response.ok){
        const data = await response.json()

        dispatch(addReview(data))

        return data
    }
}

export const getAllReviews = () => async (dispatch) => {
    
    const response = await fetch('/api/review/allReviews')

    if(response.ok){
        const data = await response.json()
        // console.log(data, '-----------dataAllRev')

        dispatch(allReviews(data))

        return data;
    }
}

//state
const initialState = {}

const reviewReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_REVIEW_FOR_USER: {
            const newState = {}

            // console.log(action.payload.Reviews, '----state get reviews')
            action.payload.Reviews.forEach((review) => {
                newState[review.id] = review
            })
            return newState
        }
        case DELETE_REVIEW_ID:{
            const newState = {...state}

            // console.log(action.payload, '------DelAction')

            delete newState[action.payload.id]
            return newState
        }
        case ADD_REVIEW_BY_PLACE_ID:{
            const newState = {...state}
            // console.log(action.payload, '--------actionPayl')

            newState[action.payload.id] = action.payload

            return newState
        }
        case GET_ALL_REVIEWS:{
            const newState = {}
            // console.log(action.payload.allReviews, '----------getAllReviewState')

            action.payload.allReviews.forEach( rev => newState[rev.id] = rev)

            return newState
        }
        default:
            return state
    }
}

export default reviewReducer
