import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCart } from "../../store/cart";
import { getAllPlaces } from "../../store/places";
import UpdateQuantity from "../UpdateItemQuantity/updateQuantity";
import Update from "../UpdateItemQuantityModal/UpdateItemQuantityModal";
import DeleteItemCart from "../ItemDeleteModal/ItemDeleteModal";
import UpdatePayment from "../UpdatePayment/UpdatePayment";
import "./currentCart.css"
import { NavLink } from "react-router-dom/cjs/react-router-dom";


const CurrCart = () => {

    const dispatch = useDispatch()

    const [isLoaded, setIsLoaded] = useState(false)

    const cart = useSelector(state => state.cart)
    const test  = useSelector(state => state)
    // const cartItemLen = useSelector(state => Object.values(state.cart.Items))
    const places = useSelector(state => state.places)
    const cartTotal = useSelector(state => state.cart.Total)
    const userId = useSelector(state => state.session.user)
    console.log(cart, userId, places, cartTotal, test,'--------stateCurr')
    console.log(places, '-------------test')

    useEffect(() =>{
        dispatch(getUserCart(userId ? userId.id : userId))
        dispatch(getAllPlaces()).then(() => setIsLoaded(true))
    }, [dispatch, userId])

    if (!userId){
        return(
            <p>Please <NavLink exact to='/login'>Sign In</NavLink></p>
            )
    }

    if(!Object.values(cart).length){
        return(
            <p>Your Cart is Empty</p>
            )
        }

        let cartDetail = Object.values(cart.Items)
        // console.log(cartDetail, cart.CartOder, '-------------cartDetail')

    return(
        <>
        {isLoaded &&(
        <div className="cart-main-container">
            <h3>Cart Items</h3>
            <div className="test">
                Hello! {userId.lastname}, {userId.firstname}
            </div>
            <div>
                To Checkout Please Click the Payment Button
            </div>
            {/* {cartDetail.length ? */}
        <div className="columns">
            <div className="item-list">
                {cartDetail.map( item => (
                    <div key={item.id} className="cartList">
                        <div>
                            Tickets For <b>{places[item.place_id].name}</b>
                        </div>
                        <div>
                            Qunatity {item.quantity}
                            <div>
                                {/* Total: ${places[item.place_id].price * item.quantity} */}
                            </div>
                        </div>
                        <div className="cart-Btns">
                            <div>
                                <Update item={item}/>
                            </div>
                            <div className="delbtn">
                                <DeleteItemCart id={item.id} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="payment">
            {cartDetail.length ?
                <div>
                    <div>
                        <UpdatePayment />
                    </div>

                            <div>Cart Total: ${cartTotal.total}</div>
                            <div>Items({cartDetail.length})</div>

                </div>
            :
                        <div>Total: $0
                        <div>Cart is Empty</div>
                    {/* </div> */}
                </div>}
                </div>
            </div>
        </div>
        )}
        </>

    )
}

export default CurrCart
