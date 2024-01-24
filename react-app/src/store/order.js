const ORDER_HIS_USERID = 'activities/getOrderHistoryForUser'
const DELETE_ORDER_HIS = 'activities/deleteOrderHistory'

const getHistory = (orders) => {
    return{
        type: ORDER_HIS_USERID,
        payload: orders
    }
}

const deleteOrderHis = (delOrder) => {
    return{
        type: DELETE_ORDER_HIS,
        payload: delOrder
    }
}

export const getOrderHistoryByUserId = () => async (dispatch) => {

    const response = await fetch('/api/cart/history')
    // console.log(response, '----orderHis')

    if(response.ok){
        const data = await response.json()
        // console.log(data, '-------orderDATA')

        dispatch(getHistory(data))
        return data
    }
}

export const deleteOrderById = (id) => async (dispatch) => {

    const response = await fetch(`/api/cart/delete/${id}`, {
        method: 'DELETE'
    })
    // console.log(response, '----delRes')

    if(response.ok){
        const data = await response.json()

        dispatch(deleteOrderHis(data))
        return data
    }
}

const initialState = {}

const OrderHistoryReducer = (state = initialState, action) => {
    switch(action.type){
        case ORDER_HIS_USERID:{
            let newState = {}

            // console.log(action.payload.OrderHistory, '-----state order')
            // action.payload.OrderHistory.forEach(order => {
            //     newState[order.id] = order
            // })
            newState = {...action.payload.OrderHistory}
            return newState
        }
        case DELETE_ORDER_HIS:{
            const newState = {...state}

            // console.log(action.payload, '------del state')

            delete newState[action.payload.id]

            return newState
        }
        default:
            return state
    }
}

export default OrderHistoryReducer
