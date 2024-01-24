import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteOrderById } from "../../store/order";


const DelOrderbyId = ({id}) => {

    // console.log(id, typeof(id), '----delOrderId')
    const dispatch = useDispatch()

    const [modal, setModal] = useState(false)

    const toggleModal = () => {
        setModal(!modal)
    }

    const handleOrderDelete = () => {
        dispatch(deleteOrderById(id))
        toggleModal()
    }

    return (
        <>
            <button className="button1" onClick={toggleModal}>
                Delete Order
            </button>

            {modal && (
                <div id="modal">
                    <div id="modal-background" onClick={toggleModal}></div>
                    <div id="modal-content-del">
                        <div className="modal-content-inner">
                            <div className="cartDel-first">
                                <i className="fa-solid fa-triangle-exclamation fa-2xl" style={{color: "#fa0511"}}></i>
                            </div>
                            <div className="cartDel-second">
                                <div className="del-main-title">Delete Order?</div>
                                <div className="deletetext">Are you sure you want to delete your order</div>
                            </div>
                        </div>
                        <div className="cart-delBtn">
                                <div>
                                    <button className="modal-button keep-button-del button1"onClick={toggleModal}>
                                        Cancel
                                    </button>
                                </div>
                                <div>
                                    <button className="modal-button delete-button button1" onClick={handleOrderDelete}>
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

export default DelOrderbyId