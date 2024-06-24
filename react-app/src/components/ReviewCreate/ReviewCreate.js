import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createNewReviewByPlaceId } from "../../store/review";
import './reviewCreate.css'
import { FaStar } from "react-icons/fa";


const CreateReview = ( {id} ) => {

    // console.log(id, typeof(id), '------id')
    const dispatch = useDispatch()

    const [modal, setModal] = useState(false)
    const [review, setReview] = useState('')
    const [stars, setStars] = useState(null)
    const [hover, setHover] = useState(null)
    const [validation, setValidation] = useState('')

    const toggleModal = () => {
        setModal(!modal)
    }

    const handlePost = async(e) => {
        e.preventDefault()

        const errors = {}
        if(review.length < 5 || review.length > 100) errors['review'] = 'Review requires between 5 to 100 characters'
        if(stars < 1 || stars > 5) errors['stars'] = 'Click on a Star to Rate'

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
                                    <div>
                                        {[...Array(5)].map((star, i) =>{
                                            const starsVal=i+1
                                            return(
                                                <label>
                                                    <input type='radio' name='rating' 
                                                    style={{display:'none'}}
                                                    required
                                                    value={Number(starsVal)}
                                                    onClick={()=> setStars(Number(starsVal))}
                                                    />
                                                    <FaStar size={25}  
                                                    color={starsVal <= (hover||stars) ? "#ffc107" : "#e4e5e9"} 
                                                    style={{cursor:'pointer'}}
                                                    onMouseOver={() => setHover(starsVal)}
                                                    onMouseOut={() => setHover(null)}
                                                    />
                                                </label>
                                            )
                                        })}
                                                    {
                                                    validation.stars && (
                                                        <div style={{color: 'red'}}>
                                                            {validation.stars}
                                                        </div>
                                                    )
                                                    }
                                    </div>
                                    {/* <label>
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
                                    </label> */}
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
