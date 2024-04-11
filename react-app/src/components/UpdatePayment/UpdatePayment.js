import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCart, payment } from "../../store/cart";
import "./UpdatePayment.css"
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom";


const UpdatePayment = () => {
    // console.log('----------updaatePayment')

    const dispatch = useDispatch()
    const history = useHistory()

    const user = useSelector(state => state.session.user)
    // console.log(user, '----------paymentUser')

    const handle = () => {
        dispatch(payment())
        dispatch(getUserCart(user ? user.id : user))
        alert("Payment is Complete")
        
        // console.log('test redirect =======')
        return history.push('/')
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
