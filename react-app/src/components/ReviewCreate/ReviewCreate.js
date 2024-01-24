import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createNewReviewByPlaceId } from "../../store/review";
import './reviewCreate.css'


const CreateReview = ( {id} ) => {

    // console.log(id, typeof(id), '------id')
    const dispatch = useDispatch()

    const [modal, setModal] = useState(false)
    const [review, setReview] = useState('')
    const [stars, setStars] = useState('')
    const [validation, setValidation] = useState('')

    const toggleModal = () => {
        setModal(!modal)
    }

    const handlePost = async(e) => {
        e.preventDefault()

        const errors = {}
        if(review.length < 5 || review.length > 100) errors['review'] = 'Review requires between 5 to 100 characters'
        if(stars < 1 || stars > 5) errors['stars'] = 'Rating must be between 1 and 5'

        if(Object.values(errors).length){
            return setValidation(errors)
        }

        const content = {
            place_id: id,
            review,
            stars
        }

        let newReview = await dispatch(createNewReviewByPlaceId(content, id))

        // console.log(newReview, '------new')

        setValidation({})
        toggleModal()

    }

    return(
        <>
            <button className="button1" onClick={toggleModal}>
                Review
            </button>

            {modal && (
                <div id="modal">
                    <div id="modal-background" onClick={toggleModal}></div>
                    <div id="modal-content-del" className="">
                        <div className="update-main review-modal">
                            Review
                        </div>
                        <div>
                            <form onSubmit={handlePost}>
                                <div className="update-quantity review-input">
                                    <label>
                                        Review: <input
                                        id="quantity"
                                        required
                                        placeholder="atleast 5 words"
                                        value={review}
                                        onChange={e => setReview(e.target.value)}
                                        />
                                        {
                                            validation.review && (
                                                <div style={{color: 'red'}}>
                                                    {validation.review}
                                                </div>
                                            )
                                        }
                                    </label>
                                </div>
                                <div className="update-quantity review-input">
                                    <label>
                                        Stars: <input
                                        id="quantity"
                                        required
                                        placeholder="between 1 to 5"
                                        value={stars}
                                        type="number"
                                        onChange={e => setStars(e.target.value)}
                                        />
                                        {
                                            validation.stars && (
                                                <div style={{color: 'red'}}>
                                                    {validation.stars}
                                                </div>
                                            )
                                        }
                                    </label>
                                </div>
                            </form>
                        </div>

                        <div className="cart-delBtn">
                                <div>
                                    <button className="modal-button keep-button-del button1"onClick={toggleModal}>
                                        Cancel
                                    </button>
                                </div>
                                <div>
                                    <button className="modal-button delete-button button1" onClick={handlePost}>
                                        Post
                                    </button>
                                </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default CreateReview
