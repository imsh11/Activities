import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { getUserCart } from "../../store/cart";



const UpdateQuantity = ({}) => {

    const [quantity, setQuantity] = useState('')
    const [validation, setValidation] = useState('')

    const dispatch = useDispatch()
    const history = useHistory()

    const user = useSelector(state => state.session.user)
    const item = useSelector(state => state)
    // console.log(user, item)

    // useEffect(() => {
    //     dispatch(getUserCart(user.id))
    // }, [dispatch])

    return (
        <>
            Test
        </>
    )
}


export default UpdateQuantity
