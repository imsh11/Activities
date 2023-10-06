import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderHistoryByUserId } from "../../store/order";

const OrderHistoryByUserId = () => {

    const dispatch = useDispatch()

    const[isLoaded, setIsLoaded] = useState(false)

    const userOrders = useSelector(state => Object.values(state.orderHistory))
    console.log(userOrders, '-------order compo')

    useEffect(() => {
        dispatch(getOrderHistoryByUserId()).then(() => setIsLoaded(true))
    }, [dispatch])

    return(
        <>
            <div>
                TEsting
            </div>
            <div>
                {userOrders.map( ele =>(
                    <div key={ele.id} style={{border:'solid'}}>
                        {ele.items.map(item => (
                        <div key={item.id}>
                            <div>
                                Place: {item.place_id}
                            </div>
                            <div>
                                Qty: {item.quantity}
                            </div>
                        </div>
                    ))}
                    </div>
                ))}
            </div>
        </>
    )
}

export default OrderHistoryByUserId
