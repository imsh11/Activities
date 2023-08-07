const GET_ALL_PLACES = 'activities/getAllPlaces'


//regular
const allPlaces = (places) => {
    return {
        type: GET_ALL_PLACES,
        payload: places
    }
}


//thunk
export const getAllPlaces = () => async (dispatch) => {
    console.log('IN THUNK')
    const placeResponse = await fetch('/api/place/allPlaces')

    // console.log(placeResponse, '----resp fetch')

    if(placeResponse.ok){
        const data = await placeResponse.json()
        console.log(data, '---data')

        dispatch(allPlaces(data))
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

            return newState
        }
        default:
            return state
    }
}

export default placeReducer
