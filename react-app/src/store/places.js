const GET_ALL_PLACES = 'activities/getAllPlaces'
const GET_PLACE_DETAIL = 'activities/getDetailByPlaceId'


//regular
const allPlaces = (places) => {
    return {
        type: GET_ALL_PLACES,
        payload: places
    }
}

const detailByPlaceId = (detail) => {
    return{
        type: GET_PLACE_DETAIL,
        payload: detail
    }
}


//thunk
export const getAllPlaces = () => async (dispatch) => {
    // console.log('IN THUNK')
    const placeResponse = await fetch('/api/place/allPlaces')

    // console.log(placeResponse, '----resp fetch')

    if(placeResponse.ok){
        const data = await placeResponse.json()
        console.log(data, '---data')

        dispatch(allPlaces(data))
        return data
    }
}

export const getDetailByPlaceId = (id) => async(dispatch) => {

    const response = await fetch(`/api/place/${id}`)

    console.log(response, '------------resp Detail')

    if(response.ok){
        const data = await response.json()

        console.log(data, '---------------data')

        dispatch(detailByPlaceId(data))

        return data
    }
}


//state
const initialState = {};

const placeReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_ALL_PLACES:{

            const newState = {}

            console.log(action.payload, '---------action')

            action.payload.Places.forEach( ele => newState[ele.id] = ele)

            // console.log(newState, '----newState')
            return newState
        }
        case GET_PLACE_DETAIL: {
            const newState = {}

            console.log(action.payload, '--------payload')

            newState['Place'] = action.payload.Place
            newState['Reviews'] = action.payload.Reviews
            console.log(newState, '----newState')

            return newState
        }
        default:
            return state
    }
}

export default placeReducer
