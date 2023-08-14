import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem, getUserCart } from "../../store/cart";


export default function DeleteItemCart ({id}) {

    // console.log(id, typeof(id), '-------delModal')
    const dispatch = useDispatch()

    const userId = useSelector(state => state.session.user)
    // console.log(userId, '-------Del')

    const[modal, setModal] = useState(false)

    const toggleModal = () => {
        setModal(!modal)
    }

    const handleDeleteItem = () => {
        dispatch(deleteItem(id))
        dispatch(getUserCart(userId.id))
        toggleModal()
    }

    return(
        <>
            <button className="button1" onClick={toggleModal}>
                Delete Item
            </button>

            {modal && (
                    <div id="modal">
                        <div id="modal-background" onClick={toggleModal}></div>
                        <div id="modal-content" className="modal-container">
                            <h3>Confirm Delete</h3>
                            <p className="deletetext">Are you sure you want to delete this Item?</p>
                            <button className="modal-button keep-button button1" onClick={handleDeleteItem}>
                                Delete Item
                            </button>
                            <button className="modal-button delete-button button2"onClick={toggleModal}>
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
        </>
    )
}
