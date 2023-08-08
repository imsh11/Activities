import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCart } from "../../store/cart";


const CurrCart = () => {

    const dispatch = useDispatch()

    const cartDetail = useSelector(state => Object.values(state.cart))
    const userId = useSelector(state => state.session.user)
    console.log(cartDetail, userId, '--------state')



    useEffect(() =>{
        dispatch(getUserCart(userId.id))
    }, [dispatch])

    if (!userId){
        return(
            <p>Please signIn</p>
        )
    }

    return(
        <>
            <h3>Cart Items</h3>
            <div>
                User: {userId.lastname}, {userId.firstname}
            </div>
            <div>
                {cartDetail.map( item => (
                    <div>
                        Place {item.place_id}
                        <div>
                            Qunatity {item.quantity}
                            <div>
                                Total: ${item.total}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>

    )
}

export default CurrCart
