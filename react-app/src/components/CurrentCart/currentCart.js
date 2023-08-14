import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCart } from "../../store/cart";
import { getAllPlaces } from "../../store/places";
import UpdateQuantity from "../UpdateItemQuantity/updateQuantity";
import Update from "../UpdateItemQuantityModal/UpdateItemQuantityModal";
import DeleteItemCart from "../ItemDeleteModal/ItemDeleteModal";
import UpdatePayment from "../UpdatePayment/UpdatePayment";
import "./currentCart.css"


const CurrCart = () => {

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    // const cartItemLen = useSelector(state => Object.values(state.cart.Items))
    const places = useSelector(state => state.places)
    const cartTotal = useSelector(state => state.cart.Total)
    const userId = useSelector(state => state.session.user)
    // console.log(cart, userId, places, cartTotal,'--------stateCurr')

    useEffect(() =>{
        dispatch(getUserCart(userId ? userId.id : userId))
        dispatch(getAllPlaces())
    }, [dispatch, userId])

    if (!userId){
        return(
            <p>Please sign In</p>
            )
    }

    if(!Object.values(cart).length){
        return(
            <p>Your Cart is Empty</p>
            )
        }

        let cartDetail = Object.values(cart.Items)
        // console.log(cartDetail, '-------------cartDetail')

    return(
        <>
            <h3>Cart Items</h3>
            <div className="test">
                User: {userId.lastname}, {userId.firstname}
            </div>
            <div>
                {cartDetail.map( item => (
                    <div key={item.id} className="cartList">
                        Place {item.place_id}
                        <div>
                            Qunatity {item.quantity}
                            <div>
                                Total:$
                            </div>
                        </div>
                        <div className="cart-Btns">
                            <div>
                                <Update item={item}/>
                            </div>
                            <div>
                                <DeleteItemCart id={item.id} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="cart-Btns payment">
            {cartDetail.length ? <div><UpdatePayment /></div> :
            <div></div>}

            {/* </div>
            <div> */}
                {cartDetail.length ?
                <div>Total: ${cartTotal.total}</div> :
                <div>0</div>}
            </div>
        </>

    )
}

export default CurrCart
