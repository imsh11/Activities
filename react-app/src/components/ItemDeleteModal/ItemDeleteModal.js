import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem, getUserCart } from "../../store/cart";
import "./ItemDelete.css"


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
                        <div id="modal-content-del" className="modal-container">
                            <div className="modal-content-inner">
                            <div className="cartDel-first">
                            <i className="fa-solid fa-triangle-exclamation fa-2xl" style={{color: "#fa0511"}}></i>
                            </div>
                            <div className="cartDel-Second">
                                <div className="del-main-title">Delete Item</div>
                                <div className="deletetext">Are you sure you want to delete this Item?</div>
                            </div>
                            </div>
                            <div className="cart-delBtn">
                                <div>
                                    <button className="modal-button keep-button-del button1"onClick={toggleModal}>
                                        Cancel
                                    </button>
                                </div>
                                <div>
                                    <button className="modal-button delete-button button1" onClick={handleDeleteItem}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
        </>
    )
}
