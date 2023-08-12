const GET_PLACES_TO_VISIT_FOR_USER = 'activities/getPlacesToVisitForUser'

const userWishList = (wishlist) => {
    return{
        type: GET_PLACES_TO_VISIT_FOR_USER,
        payload: wishlist
    }
}

//Thunk
export const getPlaceToVisit = () => async (dispatch) => {

    const response = await fetch(`/api/placesToVisit/placeList`)
    console.log(response, '---------GET resp')

    if(response.ok){

        const data = await response.json()
        console.log(data, 'placetoVISIT')

        dispatch(userWishList(data))

        return data
    }
}


//state
const initialState = {}

const placeListReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_PLACES_TO_VISIT_FOR_USER:{

            const newState = {}
            console.log(action, action.payload, '--------placeToVisit')

            action.payload.place_to_visit.forEach(ele => {
                newState[ele.id] = ele
            })
            console.log(newState, '---------state')

            return newState
        }
        default:
            return state
    }
}

export default placeListReducer
