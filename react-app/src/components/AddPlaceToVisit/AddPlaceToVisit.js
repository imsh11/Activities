import React, { useState } from "react";
import { useDispatch } from "react-redux";


export default function AddPlace () {

    const dispatch = useDispatch()

    const[modal, setModal] = useState(false)

    const toggleModal = () => {
        setModal(!modal)
    }

    const handleAdd = () => {
        toggleModal()
    }

    return(
        <>
            <button onClick={toggleModal}>
                Add to You List
            </button>

            {modal && (
                <div id="modal">
                    <div id="modal-background" onClick={toggleModal}></div>
                    <div id="modal-content" className="modal-container">
                        <h3>Confirm Place</h3>
                        <button className="modal-button keep-button" onClick={handleAdd}>
                            Add
                        </button>
                        <button className="modal-button delete-button" onClick={toggleModal}>
                            Cancle
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}
