import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteItem } from "../../store/cart";


export default function DeleteItemCart ({id}) {

    console.log(id, typeof(id), '-------delModal')
    const dispatch = useDispatch()

    const[modal, setModal] = useState(false)

    const toggleModal = () => {
        setModal(!modal)
    }

    const handleDeleteItem = () => {
        dispatch(deleteItem(id))
        toggleModal()
    }

    return(
        <>
            <button onClick={toggleModal}>
                Delete Item
            </button>

            {modal && (
                    <div id="modal">
                        <div id="modal-background" onClick={toggleModal}></div>
                        <div id="modal-content" className="modal-container">
                            <h3>Confirm Delete</h3>
                            <p className="deletetext">Are you sure you want to delete this review?</p>
                            <button className="modal-button keep-button" onClick={handleDeleteItem}>
                                Delete Item
                            </button>
                            <button className="modal-button delete-button"onClick={toggleModal}>
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
        </>
    )
}
