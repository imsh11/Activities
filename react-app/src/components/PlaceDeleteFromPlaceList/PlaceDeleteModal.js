import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { delPlacePlaceList } from "../../store/placeToVisit";



export default function DeletePlace ({id}) {

    console.log(id, typeof(id), '-------delModal')
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
            <button onClick={toggleModal}>
                Remove Place
            </button>

            {modal && (
                    <div id="modal">
                        <div id="modal-background" onClick={toggleModal}></div>
                        <div id="modal-content" className="modal-container">
                            <h3>Confirm</h3>
                            <p className="deletetext">Are you sure you want to remove this Place?</p>
                            <button className="modal-button remove-button" onClick={handleRemove}>
                                Remove
                            </button>
                            <button className="modal-button cancle-button"onClick={toggleModal}>
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
        </>
    )
}
