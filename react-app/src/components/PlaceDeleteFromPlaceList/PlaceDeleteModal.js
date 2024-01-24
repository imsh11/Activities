import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { delPlacePlaceList } from "../../store/placeToVisit";
import "./PlaceDelete.css"



export default function DeletePlace ({id}) {

    // console.log(id, typeof(id), '-------delModal')
    const dispatch = useDispatch()

    const userId = useSelector(state => state.session.user)
    // console.log(userId, '-------Del')

    const[modal, setModal] = useState(false)

    const toggleModal = () => {
        setModal(!modal)
    }

    const handleRemove = () => {
        dispatch(delPlacePlaceList(id))
        toggleModal()
    }

    return(
        <>
            <button className="button1 delPlace" onClick={toggleModal}>
                Remove Place
            </button>

            {modal && (
                    <div id="modal">
                        <div id="modal-background" onClick={toggleModal}></div>
                        <div id="modal-content-del" className="modal-container">
                            <div className="modal-content-inner">
                                <div className="cartDel-first">
                                    <i className="fa-solid fa-triangle-exclamation fa-2xl" style={{color: "#fa0511"}}></i>
                                </div>
                                <div className="cartDel-Second placeList-main">
                                    <div className="del-main-title">Removing from List</div>
                                    <div className="deletetext">Are you sure you want to remove this Place?</div>
                                </div>
                            </div>
                            <div className="cart-delBtn">
                                <div>
                                    <button className="modal-button keep-button-del button1"onClick={toggleModal}>
                                        Cancel
                                    </button>
                                </div>
                                <div>
                                    <button className="modal-button delete-button button1" onClick={handleRemove}>
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
        </>
    )
}
