const USER_CART_IN_SESSION = 'activities/getUserCartInSession'
const ADD_ITEM_TO_CART = 'activities/addItemToCart'
const DELETE_ITEM_ID = 'activities/deleteItemId'

const cartInSession = (currentCart) => {
    return{
        type: USER_CART_IN_SESSION,
        payload: currentCart
    }
}

const addItem = (Item) => {
    return {
        type: ADD_ITEM_TO_CART,
        payload: Item
    }
}

const delItem = (del) => {}


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

export const addItemtoCartByPlaceId = (payload, id) => async (dispatch) => {

    console.log(id, payload, typeof(id), JSON.stringify(payload),'----------addItem')
    const response = await fetch(`/api/order/place/${id}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    console.log(response, '-----------resp')

    if(response.ok){
        const data = await response.json()
        console.log(data, '-----------addItem')

        dispatch(addItem(data))

        return data
    }
}

export const updateQuantity = (payload, id) => async (dispatch) => {
    console.log(payload, id, '---------payload Id THUNK')

    const response = await fetch(`/api/order/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    console.log(response, '----------resp')

    if(response.ok){
        const data = await response.json()
        console.log(data, '------updateRES')

        dispatch(addItem(data))
        return data
    }
}


//state
const initialState = {}

const cartReducer = (state = initialState, action) => {
    switch(action.type){
        case USER_CART_IN_SESSION: {

            const newState = {}

            // console.log(action.payload, action.payload.CurrentOrder[0],'--------action')

            // newState['Cart'] = action.payload.CurrentOrder[0]
            let Items = {}
            action.payload.Items.forEach( ele => {
                // console.log(ele, i, '-------foreach')
                newState[ele.id] = ele
            })
            // newState['total'] = action.payload.Total

            // newState['Items'] = Items
            // newState['total'] = action.payload.Total
            console.log(newState, Items,'----------new')

            return newState
        }
        case ADD_ITEM_TO_CART: {
            console.log(state, action.payload.Item,'-----------stateADD')


            const newState = {...state}

            newState[action.payload.Item.id] = action.payload.Item

            console.log(newState, '-------newADD')

            return newState
        }
        default:
            return state
    }
}


export default cartReducer
