import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCart, updateQuantity } from "../../store/cart";
import { useHistory } from "react-router-dom/cjs/react-router-dom";



export default function Update({item}) {

    // console.log(item, '-------modal')
    const dispatch = useDispatch()
    const history = useHistory()

    const user = useSelector(state => state)
    // console.log(user, item.id, typeof(item.id),'-------modalstate')

    const[modal, setModal] = useState(false)
    const[quantity, setQuantity] = useState(item.quantity)
    const[validation, setValidation] = useState('')

    const toggleModal = () => {
        setModal(!modal)
    }

    // const check = () => {
    //     // if( quantity < 1 || quantity > 10){
    //     //     return true
    //     // }
    //     // else return false
    // }

    const handleUpdate = async (e) => {
        e.preventDefault()

        const errors = {}
        if( quantity < 1 || quantity > 10) errors['quantity'] = 'quantity must be between 1 and 10'

        if(Object.values(errors).length){
            setValidation(errors)
            return
        }

        console.log(quantity, typeof(Number(quantity)),'-----------quantity')

        const payload = {
            quantity: Number(quantity),
        }

        const updateQnty = await dispatch(updateQuantity(payload, item.id))
        dispatch(getUserCart(item.user_id))

        console.log(updateQnty, '-----------addForm')

        // if (updateQnty){
        //     toggleModal()
        //     return history.push('/user/cart')
        //     // return toggleModal()
        // }

        toggleModal()
        setValidation('')
    }

    return (
        <>
            <button className="update-btn button1" onClick={toggleModal}>
                Update Quantity
            </button>

            {modal && (
                <div id="modal">
                    <div id="modal-background" onClick={toggleModal}></div>
                    <div id="modal-content" className="modal-container">
                        <h4>Quantity</h4>
                        <p>Enter item Qunatity</p>
                        <form onSubmit={handleUpdate}>
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
                                                <div style={{color: 'red'}}>
                                                    {validation.quantity}
                                                </div>
                                            )
                                        }
                                </label>
                            </div>
                            <div>
                                <button className="modal-button keep-button button1" type="submit">Update</button>
                                <button className="modal-button cancle-button button2" onClick={toggleModal}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

