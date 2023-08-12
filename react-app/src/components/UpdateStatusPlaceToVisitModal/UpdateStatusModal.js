import React, { useState } from "react";
import { useDispatch } from "react-redux";


export default function UpdateStatusPlace ({id}){

    const dispatch = useDispatch()

    const[modal, setModal] = useState(false)
    const[status, setStatus] = useState('')
    const[validation, setValidation] = useState('')

    const toggleModal = () => {
        setModal(!modal)
    }

    const handleUpdatePlaceList = () => {

        toggleModal()
    }

    return(
        <>
            <button onClick={toggleModal}>
                Update Status
            </button>

            {modal && (
                <div id="modal">
                    <div id="modal-background" onClick={toggleModal}></div>
                    <div id="modal-content" className="modal-container">
                        <h4>Status</h4>
                        <p className="deletetext">write between 5 to 50 words</p>
                        <form>
                            <div>
                                <label>
                                    <input
                                        id="status"
                                        required
                                        placeholder="Your Status"
                                        value={status}
                                        type="text"
                                        onChange={e => setStatus(e.target.value)}
                                        />
                                        {
                                            validation.status && (
                                                <div style={{color: 'red'}}>
                                                    {validation.status}
                                                </div>
                                            )
                                        }
                                </label>
                            </div>
                            <div>
                                <button className="modal-button update-button" onClick={handleUpdatePlaceList}>
                                Update
                                </button>
                                <button className="modal-button cancle-button" onClick={toggleModal}>
                                Cancle
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}
