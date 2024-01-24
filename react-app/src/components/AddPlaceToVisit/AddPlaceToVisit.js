import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToPlaceList } from "../../store/placeToVisit";
import './addPlaceToVisit.css'


export default function AddPlace ({place}) {
    // console.log(place, '-----------placeIDadd')

    const dispatch = useDispatch()

    const[modal, setModal] = useState(false)
    const[status, setStatus] = useState('')
    const[validation, setValidation] = useState('')

    const toggleModal = () => {
        setModal(!modal)
    }

    const handleAdd = async (e) => {
        e.preventDefault()

        const errors = {}
        if(status.length < 5 || status.length > 50){
            errors['status'] = 'Please have alteat 5 or at most 50 words in you status'
        }

        if(Object.values(errors).length){
            setValidation(errors)
            return
        }

        const payload = {
            status
        }

        // console.log(status, '------------status')
        const addToList = await dispatch(addToPlaceList(payload, place.id))

        // console.log(addToList, '------------addTOLIST')

        toggleModal()
        setStatus('')
        setValidation('')
    }

    return(
        <>
            <button className="button1" onClick={toggleModal}>
                Add to Your List
            </button>

            {modal && (
                <div id="modal" className="">
                    <div id="modal-background" onClick={toggleModal}></div>
                    <div id="modal-content" className="modal-container login-form-content">
                        {/* <div className="addPlaceTo"> */}
                            {/* <h4>Confirm Place</h4> */}
                        {/* </div> */}
                        <div className="">
                            <form>
                            <div className="login-form-content">
                            <div className="login-main-heading">Adding <b>{place.name}</b> to your List</div>
                                <div className="">
                                    <label>
                                        <div className="login-email-title add-list">Add you Status</div>
                                        <input
                                            id="status"
                                            className="login-email-field"
                                            required
                                            placeholder="write you status within 50 words"
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
                                    <div className="">
                                    <div className="login-btn-page add-list">
                                        <button className="modal-button login-btn" onClick={handleAdd}>
                                            Add
                                        </button>
                                    </div>
                                    <div className="login-btn-page">
                                        <button className="modal-button login-btn" onClick={toggleModal}>
                                            Cancle
                                        </button>
                                    </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
