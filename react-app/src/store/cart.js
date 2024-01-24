const USER_CART_IN_SESSION = 'activities/getUserCartInSession'
const ADD_ITEM_TO_CART = 'activities/addItemToCart'
const DELETE_ITEM_ID = 'activities/deleteItemId'
const UPDATE_PAYMENT = 'activities/updatePayment'

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

const delItem = (del) => {
    return {
        type: DELETE_ITEM_ID,
        payload: del
    }
}

const updatePay = (pay) => {
    return{
        type: UPDATE_PAYMENT,
        payload: pay
    }
}


//thunk
export const getUserCart = (userId) => async (dispatch) => {

    // console.log(userId, typeof(userId),'-------Thunk')
    const response = await fetch(`/api/cart/user/current/${userId}`)

    // console.log(response, '----------response')

    if(response.ok){
        const data = await response.json()
        // console.log(data, '---------userCart')

        dispatch(cartInSession(data))
        return data
    } else {
        return {}
    }
}

export const addItemtoCartByPlaceId = (payload, id) => async (dispatch) => {

    // console.log(id, payload, typeof(id), JSON.stringify(payload),'----------addItem')
    const response = await fetch(`/api/order/place/${id}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    // console.log(response, '-----------resp')

    if(response.ok){
        const data = await response.json()
        // console.log(data, '-----------addItem')

        dispatch(addItem(data))

        return data
    }
}

export const updateQuantity = (payload, id) => async (dispatch) => {
    // console.log(payload, id, '---------payload Id THUNK')

    const response = await fetch(`/api/order/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    // console.log(response, '----------resp')

    if(response.ok){
        const data = await response.json()
        // console.log(data, '------updateRES')

        dispatch(addItem(data))
        return data
    }
}

export const deleteItem = (id) => async (dispatch) => {
    // console.log(id, typeof(id), '-----del')

    const response = await fetch(`/api/order/${id}`, {
        method: 'DELETE'
    })

    if(response.ok){
        const data = await response.json()
        // console.log(data, '--------delDATA')

        dispatch(delItem(data))
    }
}

export const payment = () => async (dispatch) => {

    const response = await fetch(`/api/cart/payment`, {
        method: 'PUT',
        body: null
    })

    // console.log(response, '---------pay')

    if(response.ok){
        const data = await response.json()
        // console.log(data, '--------payDATA')

        dispatch(updatePay(data))
        return data
    }
}


//state
const initialState = {}

const cartReducer = (state = initialState, action) => {
    switch(action.type){
        case USER_CART_IN_SESSION: {

            const newState = {}
            let cartOrder = {}
            // let total = {}

            // console.log(action.payload, action.payload.CurrentOrder[0],'--------action')

            cartOrder['Cart'] = action.payload.CurrentOrder[0]
            // cartOrder.Cart['Items'] = action.payload.Items

            // console.log(cartOrder, '---------getCARTORDER')

            // if(cartOrder === undefined){
            //     return {}
            // } else {

            // }
            // cartOrder.Cart['Total'] = action.payload.Total


            // cartOrder ? cartOrder.Cart['Total'] = action.payload.Total : {}
            let Items = {}
            action.payload.Items.forEach( ele => {
                // console.log(ele, i, '-------foreach')
                Items[ele.id] = ele
            })

            newState['Total'] = {total: action.payload.Total}
            newState['CartOrder'] = cartOrder
            newState['Items'] = Items
            // console.log(newState, Items, cartOrder,'----------new')

            return newState
        }
        case ADD_ITEM_TO_CART: {
            // console.log(state, action.payload,'-----------stateADD')


            const newState = {...state,
                Items:{...state.Items, [action.payload.Item.id]: action.payload.Item}}

            // newState.CartOrder.Cart.Items.push(action.payload.Item)
            // newState.Items[action.payload.Item.id] = action.payload.Item

            // console.log(newState, '-------newADD')

            return newState
        }
        case DELETE_ITEM_ID: {

            // const newState = {...state}
            // console.log(state, '--------delState')
            // delete state.Items[action.payload.id]

            let ItemArr = Object.values(state.Items)
            let delItem = ItemArr.filter(it => it.id !== action.payload.id)
            let Item = {}
            delItem.forEach(ele => Item[ele.id] = ele)


            const newState = {...state,
                Items: Item}
            // console.log(action.payload.id, newState, ItemArr, delItem,'-------stateDEL')


            return newState
        }
        case UPDATE_PAYMENT: {

            // console.log(state, action.payload, '--------pay')

            const newState = {CartOrder:{...state.CartOrder.Cart,
            ['Cart']: action.payload.update}, Items:{...state.Items},
            Total: {...state.Total}}

            // const newState = {}

            // console.log(newState, '----------newStatePAY')

            return newState
        }
        default:
            return state
    }
}


export default cartReducer
