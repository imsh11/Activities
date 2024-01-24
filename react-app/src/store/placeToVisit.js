const GET_PLACES_TO_VISIT_FOR_USER = 'activities/getPlacesToVisitForUser'
const ADD_TO_PLACES_TO_VISIT = 'activities/addToPlacesToVisit'
const DELETE_PLACE_FROM_PLACES_TO_VISIT = 'activities/deletePlacesFromPlacesToVisit'

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

const deletePlaceList = (delPlace) =>{
    return{
        type: DELETE_PLACE_FROM_PLACES_TO_VISIT,
        payload: delPlace
    }
}

//Thunk
export const getPlaceToVisit = () => async (dispatch) => {

    const response = await fetch(`/api/placesToVisit/placeList`)
    // console.log(response, '---------GET resp')

    if(response.ok){

        const data = await response.json()
        // console.log(data, 'placetoVISIT')

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

export const updateStatusPlaceList = (payload, id) => async (dispatch) => {
    // console.log(id, payload, '-----------updateSTATUS')

    const response = await fetch(`/api/placesToVisit/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    // console.log(response, '-----------updateRES')

    if(response.ok){
        const data = await response.json()
        // console.log(data, '------------UpdateDATA')

        dispatch(addToList(data))
        return
    }
}

export const delPlacePlaceList = (id) => async (dispatch) => {
    // console.log(id, '-----------id')

    const response = await fetch(`/api/placesToVisit/${id}`, {
        method: 'DELETE'
    })
    // console.log(response, '------------responseDEL')

    if(response.ok){
        const data = await response.json()
        // console.log(data, '-----------dataDEL')

        dispatch(deletePlaceList(data))

        return data
    }
}


//state
const initialState = {}

const placeListReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_PLACES_TO_VISIT_FOR_USER:{

            const newState = {}
            // console.log(action, action.payload, '--------placeToVisit')

            action.payload.place_to_visit.forEach(ele => {
                newState[ele.id] = ele
            })
            // console.log(newState, '---------state')

            return newState
        }
        case ADD_TO_PLACES_TO_VISIT: {
            // console.log(state, action, action.payload, '----------ADDListSTATE')

            const newState = {
                ...state, [action.payload.id]: action.payload
            }
            // console.log(newState, '-------------newStateADD')

            return newState
        }
        case DELETE_PLACE_FROM_PLACES_TO_VISIT: {
            // console.log(state, action.payload, '-----------stateStoreDEL')
            const newState = {...state}

            delete newState[action.payload.id]
            // console.log(newState, '-----------afterDELstore')

            return newState
        }
        default:
            return state
    }
}

export default placeListReducer
