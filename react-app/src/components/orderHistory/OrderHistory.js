import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderHistoryByUserId } from "../../store/order";
import { getAllPlaces } from "../../store/places";
import ItemQuantityForm from "../ItemQuantityForm/ItemQuantityForm";

const OrderHistoryByUserId = () => {

    const dispatch = useDispatch()

    const[isLoaded, setIsLoaded] = useState(false)

    const userOrders = useSelector(state => Object.values(state.orderHistory))
    const user = useSelector(state => state.session.user)
    const places = useSelector(state => state.places)
    console.log(userOrders, '-------order compo')

    useEffect(() => {
        dispatch(getAllPlaces())
        dispatch(getOrderHistoryByUserId()).then(() => setIsLoaded(true))
    }, [dispatch, user])

    return(
        <>
        {isLoaded &&(
            <div>
                <div>
                    TEsting
                </div>
                <div>
                    {userOrders.map( ele =>(
                        <div key={ele.id} style={{border:'solid'}}>
                            {ele.items.map(item => (
                            <div key={item.id}>
                                <div>
                                    Place: {places[item.place_id].name}
                                </div>
                                <div>
                                    Qty: {item.quantity}
                                </div>
                            </div>
                        ))}
                        </div>
                    ))}
                </div>
            </div>
        )}
        </>
    )
}

export default OrderHistoryByUserId
