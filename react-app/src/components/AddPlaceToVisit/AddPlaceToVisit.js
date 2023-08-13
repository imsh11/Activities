import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToPlaceList } from "../../store/placeToVisit";


export default function AddPlace ({id}) {
    console.log(id, '-----------placeIDadd')

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

        console.log(status, '------------status')
        const addToList = await dispatch(addToPlaceList(payload, id))

        console.log(addToList, '------------addTOLIST')

        toggleModal()
        setValidation('')
    }

    return(
        <>
            <button onClick={toggleModal}>
                Add to Your List
            </button>

            {modal && (
                <div id="modal">
                    <div id="modal-background" onClick={toggleModal}></div>
                    <div id="modal-content" className="modal-container">
                        <h4>Confirm Place</h4>
                        <form>
                            <div>
                                <label>
                                    <input
                                        id="status"
                                        required
                                        placeholder="write you plan within 50 words"
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
                            <button className="modal-button keep-button" onClick={handleAdd}>
                                Add
                            </button>
                            <button className="modal-button delete-button" onClick={toggleModal}>
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
