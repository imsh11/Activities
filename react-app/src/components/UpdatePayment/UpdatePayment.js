import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCart, payment } from "../../store/cart";


const UpdatePayment = () => {
    // console.log('----------updaatePayment')

    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user)
    // console.log(user, '----------paymentUser')

    const handle = () => {
        dispatch(payment())
        dispatch(getUserCart(user ? user.id : user))
    }

    return(
        <>
            <button className="button1 payBtn" onClick={handle}>
                Payment
            </button>
        </>
    )
}

export default UpdatePayment
