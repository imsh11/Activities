import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderHistoryByUserId } from "../../store/order";
import { getAllPlaces } from "../../store/places";
import ItemQuantityForm from "../ItemQuantityForm/ItemQuantityForm";
import CreateReview from "../ReviewCreate/ReviewCreate";
import './orderHistory.css'

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

    let total;

    return(
        <>
        {isLoaded &&(
            <div>
                <div className="title">
                    Order History
                </div>
                <div className="mainContent-orderHis">
                    {userOrders.map( ele =>(
                        <div key={ele.id} style={{}} className="main-orderHis">
                            <div className="order-date">
                                Order Date: {ele.updated_at}
                            </div>
                            {ele.items.map(item => (
                            <div key={item.id} className="main-order-detail">
                                <div className="order-detail-content">
                                    <div className="orderHis-item">
                                        {places[item.place_id].name}
                                    </div>
                                    <div className="orderHis-item">
                                        Qty: {item.quantity}
                                    </div>
                                    <div className="orderHis-item" style={{fontWeight: 'bold'}}>
                                        Price: ${places[item.place_id].price * item.quantity}
                                    </div>
                                </div>
                                <div className="add-review">
                                    <CreateReview id={item.place_id} />
                                </div>
                                <div className="delete-orderHis">
                                    <button className="button1" onClick={() => window.alert('feature coming soon!')}>
                                        Delete
                                    </button>
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
