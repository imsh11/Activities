// const ADD_ITEM_TO_CART = 'activities/addItemToCart'

// const addItem = (Item) => {
//     return {
//         type: ADD_ITEM_TO_CART,
//         payload: Item
//     }
// }

// export const addItemtoCartByPlaceId = (payload, id) => async (dispatch) => {

//     console.log(id, payload, typeof(id), JSON.stringify(payload),'----------addItem')
//     const response = await fetch(`/api/order/place/${id}`, {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(payload)
//     })
//     console.log(response, '-----------resp')

//     if(response.ok){
//         const data = await response.json()
//         console.log(data, '-----------addItem')

//         dispatch(addItem(data))

//         return data
//     }
// }

// const initialState = {}

// const addItemReducer = (state = initialState, action) => {
//     switch(action.type){
//         case ADD_ITEM_TO_CART: {

//             const newState = {}

//             console.log(action, '---------additemRed')

//             return newState
//         }
//         default:
//             return state
//     }
// }

// export default addItemReducer
