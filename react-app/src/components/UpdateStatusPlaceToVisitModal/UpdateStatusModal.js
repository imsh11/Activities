import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateStatusPlaceList } from "../../store/placeToVisit";
import "./UpdateStatus.css"


export default function UpdateStatusPlace ({place}){
    console.log(place, '----------id')

    const dispatch = useDispatch()

    const[modal, setModal] = useState(false)
    const[status, setStatus] = useState(place.status)
    const[validation, setValidation] = useState('')

    const toggleModal = () => {
        setModal(!modal)
    }

    const handleUpdatePlaceList = async (e) => {
        e.preventDefault()

        const errors = {}
        if(status.length < 5 || status.length > 50){
            errors['status'] = 'Status must have alteat 5 or at most 50 words'
        }

        if(Object.values(errors).length){
            setValidation(errors)
            return
        }

        const payload = {
            status
        }

        console.log(payload, '--------------payload')

        const updateSt = await dispatch(updateStatusPlaceList(payload, place.id))
        console.log(updateSt, '-----------------updateST')

        toggleModal()
        setValidation('')
    }

    return(
        <>
            <button className="button1" onClick={toggleModal}>
                Update Status
            </button>

            {modal && (
                <div id="modal">
                    <div id="modal-background" onClick={toggleModal}></div>
                    <div id="modal-content-placeList" className="modal-container">
                        <div className="up-main-title">
                            <div className="up-main-heading">Update Status</div>
                            <div className="">Status must have atleast 5 or maximum of 50 words</div>
                        </div>

                        <form>
                            <div className="up-form-content">
                                <label>
                                    <div className="up-field-name">
                                        <b>Current Status:</b>&nbsp;
                                        <input
                                            id="updatestatus"
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
                                    </div>
                                </label>
                            </div>
                            <div className="placeList-UpDel">
                                <div className="placeList-can">
                                    <button className="modal-button can-button button2" onClick={toggleModal}>
                                        Cancle
                                    </button>
                                </div>
                                <div className="placeList-up">
                                    <button className="modal-button up-button button1" onClick={handleUpdatePlaceList}>
                                        Update
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}
