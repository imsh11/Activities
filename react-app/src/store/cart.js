const USER_CART_IN_SESSION = 'activities/getUserCartInSession'

const cartInSession = (currentCart) => {
    return{
        type: USER_CART_IN_SESSION,
        payload: currentCart
    }
}


//thunk
export const getUserCart = (userId) => async (dispatch) => {

    console.log(userId, typeof(userId),'-------Thunk')
    const response = await fetch(`/api/cart/user/current/${userId}`)

    console.log(response, '----------response')

    if(response.ok){
        const data = await response.json()
        console.log(data, '---------userCart')

        dispatch(cartInSession(data))
        return data
    } else {
        return {}
    }
}


//state
const initialState = {}

const cartReducer = (state = initialState, action) => {
    switch(action.type){
        case USER_CART_IN_SESSION: {

            const newState = {}

            console.log(action.payload, action.payload.CurrentOrder[0],'--------action')

            // newState['Cart'] = action.payload.CurrentOrder[0]
            let Items = {}
            let i = 0
            action.payload.Items.forEach( ele => {
                i++
                console.log(ele, i, '-------foreach')
                newState[i] = ele
                newState[i]['total'] = action.payload.Total
            })

            // newState['Items'] = Items
            // newState['total'] = action.payload.Total
            console.log(newState, Items,'----------new')

            return newState
        }
        default:
            return state
    }
}


export default cartReducer
