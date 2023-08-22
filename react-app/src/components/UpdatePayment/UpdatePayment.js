import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCart, payment } from "../../store/cart";
import "./UpdatePayment.css"


const UpdatePayment = () => {
    // console.log('----------updaatePayment')

    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user)
    // console.log(user, '----------paymentUser')

    const handle = () => {
        dispatch(payment())
        dispatch(getUserCart(user ? user.id : user))
        return alert("Payment is Complete")
    }

    return(
        <>
        <div className="payBtn-container">
            <button className="button1 payBtn1" onClick={handle}>
                Payment
            </button>
        </div>
        </>
    )
}

export default UpdatePayment
