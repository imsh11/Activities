import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { delReviwByReviewId } from "../../store/review";

const DeleteReviewId = ({id}) => {

    // console.log(id, typeof(id),'---------id')
    const dispatch = useDispatch()

    const [modal, setModal] = useState(false)

    const toggleModal = () => {
        setModal(!modal)
    }

    const handleReviewDelete = () => {
        dispatch(delReviwByReviewId(id))
        toggleModal()
    }

    return(
        <>
            <button className="button1" onClick={toggleModal}>
                Delete Review
            </button>

            {modal && (
                <div id="modal">
                    <div id="modal-background" onClick={toggleModal}></div>
                    <div id="modal-content-del" className="">
                        <div className="modal-content-inner">
                            <div className="cartDel-first">
                                <i className="fa-solid fa-triangle-exclamation fa-2xl" style={{color: "#fa0511"}}></i>
                            </div>
                            <div className="cartDel-second">
                                <div className="del-main-title">Delete Review?</div>
                                <div className="deletetext">Click Delete to Procede or Cancle</div>
                            </div>
                        </div>
                        <div className="cart-delBtn">
                                <div>
                                    <button className="modal-button keep-button-del button1"onClick={toggleModal}>
                                        Cancel
                                    </button>
                                </div>
                                <div>
                                    <button className="modal-button delete-button button1" onClick={handleReviewDelete}>
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

export default DeleteReviewId
