import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { addItemtoCartByPlaceId } from "../../store/cart";
import { getUserCart } from "../../store/cart";
import "./ItemQuantity.css"

const ItemQuantityForm = ({id}) => {

    console.log(id, typeof(id),'---place id')

    const [quantity, setQuantity] = useState('')
    const [validation, setValidation] = useState('')

    const dispatch = useDispatch()
    const history = useHistory()

    const userId = useSelector(state => state.session.user)
    // const cartId = useSelector(state => state.cart)
    console.log(userId, typeof(userId), '---------userId')


    useEffect(() => {
        dispatch(getUserCart(userId ? userId.id : userId))
    }, [dispatch])

    // if (!Object.values(cartId).length){
    //     return(
    //         <p>loading...</p>
    //     )
    // }

    // console.log(cartId[1].cart_order_id, typeof(cartId[1].cart_order_id), '-------------cartId')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const errors = {}
        if( quantity < 1 || quantity > 10) errors['quantity'] = 'quantity must be between 1 and 10'

        if(Object.values(errors).length){
            setValidation(errors)
            return alert('Please change quantity')
        }

        console.log(quantity, typeof(Number(quantity)), id, typeof(id),'-----------quantity')

        const payload = {
            quantity: Number(quantity),
        }

        const add = await dispatch(addItemtoCartByPlaceId(payload, id))

        console.log(add, '-----------addForm')

        if (add){
            return history.push('/user/cart')
        }

    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        <input
                            id="quantity"
                            required
                            placeholder="Between 1 to 10"
                            value={quantity}
                            type="number"
                            onChange={e => setQuantity(e.target.value)}
                            />
                            {
                                validation.quantity && (
                                    <div style={{color:'red'}}>
                                        {validation.quantity}
                                    </div>
                                )
                            }
                    </label>
                </div>
                <div>
                    <button type="submit" className="button1">Add to Cart</button>
                </div>
            </form>
        </>
    )
}

export default ItemQuantityForm
