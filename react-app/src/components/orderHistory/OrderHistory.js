import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderHistoryByUserId } from "../../store/order";
import { getAllPlaces } from "../../store/places";
import ItemQuantityForm from "../ItemQuantityForm/ItemQuantityForm";
import CreateReview from "../ReviewCreate/ReviewCreate";
import './orderHistory.css'
import DelOrderbyId from "../orderDel/OrderDel";

const OrderHistoryByUserId = () => {

    const dispatch = useDispatch()

    const[isLoaded, setIsLoaded] = useState(false)

    const userOrders = useSelector(state => Object.values(state.orderHistory))
    const user = useSelector(state => state.session.user)
    const places = useSelector(state => state.places)
    const review = useSelector(state => Object.values(state.reviews)) // user reviews
    // const review = useSelector(state => Object.keys(state.reviews)) // user reviews
    console.log(userOrders, review, '-------order compo')

    useEffect(() => {
        dispatch(getAllPlaces())
        dispatch(getOrderHistoryByUserId()).then(() => setIsLoaded(true))
    }, [dispatch, user])

    let total;

    // places user have reviewed already
    let revPlaces = []
    review.forEach( (obj) => revPlaces.push(obj.place_id))

    console.log(revPlaces, '--------revPlaces')

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
                            <div className="delete-orderHis">
                                    <DelOrderbyId id={ele.id} />
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
                                    {revPlaces.includes(item.place_id)?
                                    <div>
                                        <button>
                                            
                                        </button>
                                    </div>
                                    :
                                    <div>

                                    </div>
                                    }
                                    <CreateReview id={item.place_id} />
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
