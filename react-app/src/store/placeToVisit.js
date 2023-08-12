const GET_PLACES_TO_VISIT_FOR_USER = 'activities/getPlacesToVisitForUser'
const ADD_TO_PLACES_TO_VISIT = 'activities/addToPlacesToVisit'

const userWishList = (wishlist) => {
    return{
        type: GET_PLACES_TO_VISIT_FOR_USER,
        payload: wishlist
    }
}

const addToList = (place) => {
    return{
        type: ADD_TO_PLACES_TO_VISIT,
        payload: place
    }
}

//Thunk
export const getPlaceToVisit = () => async (dispatch) => {

    const response = await fetch(`/api/placesToVisit/placeList`)
    // console.log(response, '---------GET resp')

    if(response.ok){

        const data = await response.json()
        console.log(data, 'placetoVISIT')

        dispatch(userWishList(data))

        return data
    }
}

export const addToPlaceList = (payload, id) => async (dispatch) => {
    // console.log(payload, id, '---------ADDLIST')

    const response = await fetch(`/api/placesToVisit/place/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    // console.log(response, '------------resADD')

    if(response.ok){
        const data = await response.json()
        // console.log(data, '--------ADDList')

        dispatch(addToList(data))
        return data
    }
}

export const updateStatuPlaceList = (payload, id) => async (dispatch) => {
    console.log(id, payload, '-----------updateSTATUS')

    const response = await fetch(`/api/placesToVisit/place/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    console.log(response, '-----------updateRES')

    if(response.ok){
        const data = await response.json()
        console.log(data, '------------UpdateDATA')

        dispatch(addToList(data))
        return
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
        case ADD_TO_PLACES_TO_VISIT: {
            console.log(state, action, action.payload, '----------ADDListSTATE')

            const newState = {
                ...state, [action.payload.id]: action.payload
            }
            console.log(newState, '-------------newStateADD')

            return newState
        }
        default:
            return state
    }
}

export default placeListReducer
