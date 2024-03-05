const GET_ALL_USERS = 'activities/getAllUsers'

const users = (allUsers) => {
    return{
        type: GET_ALL_USERS,
        payload: allUsers
    }
}

export const getAllUsers = () => async (dispatch) => {

    console.log('test in getAllUsers')
    const response = await fetch('/api/users/')

    if(response.ok){
        const data = await response.json()
        console.log(data, '-----data all users')
    }
}

const initialState = {}

export default function Users (state = initialState, action) {
    switch(action.type){
        case GET_ALL_USERS: {
            
            const newState = {}
            console.log(action.payload, '----user all state')

            return newState
        }
        default:
            return state;
    }
}

