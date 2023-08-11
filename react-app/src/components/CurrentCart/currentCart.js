import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCart } from "../../store/cart";
import { getAllPlaces } from "../../store/places";
import UpdateQuantity from "../UpdateItemQuantity/updateQuantity";
import Update from "../UpdateItemQuantityModal/UpdateItemQuantityModal";
import DeleteItemCart from "../ItemDeleteModal/ItemDeleteModal";


const CurrCart = () => {

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const places = useSelector(state => state.places)
    const userId = useSelector(state => state.session.user)
    console.log(cart, userId, places, '--------stateCurr')



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
            <p>loading...</p>
            )
        }

        let cartDetail = Object.values(cart)
        console.log(cartDetail, '-------------cartDetail')

    return(
        <>
            <h3>Cart Items</h3>
            <div>
                User: {userId.lastname}, {userId.firstname}
            </div>
            <div>
                {cartDetail.map( item => (
                    <div key={item.id}>
                        Place {item.place_id}
                        <div>
                            Qunatity {item.quantity}
                            <div>
                                Total:$
                            </div>
                        </div>
                        <div>
                            <Update item={item}/>
                        </div>
                        <div>
                            <DeleteItemCart id={item.id} />
                        </div>
                    </div>
                ))}
            </div>
            <div>
                Total: ${cartDetail.length ?
                <div>{cart.total}</div> :
                <div>0</div>}
            </div>
        </>

    )
}

export default CurrCart
