import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom/cjs/react-router-dom";
import { getDetailByPlaceId } from "../../store/places";
import ItemQuantityForm from "../ItemQuantityForm/ItemQuantityForm";
import AddPlace from "../AddPlaceToVisit/AddPlaceToVisit";
import { getPlaceToVisit } from "../../store/placeToVisit";
import waterimg from '../../images/water-park-photo.jpeg'
import fiveFlags from '../../images/fair-fairground-ferris-wheel-carousel-40547.jpeg'
import bronxZoo from '../../images/bronx-zoo.png'
import natural from '../../images/natural-history-museum.jpg'
import splish from '../../images/water-park-2.jpg'
import aqua from '../../images/aquarium.jpeg'
import "./detail.css"
import { getUserCart } from "../../store/cart";

const DetailPg = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const [isLoaded, setIsLoaded] = useState(false)

    const {id} = useParams()
    const placeDetail = useSelector(state => state.places)
    const userId = useSelector(state => state.session.user)
    const placeVisitList = useSelector(state => state.placesList)
    const cart = useSelector(state => state.cart)
    console.log((placeDetail), id, typeof(id), cart,'--------stateID')
    console.log(placeDetail.Reviews, placeVisitList, userId, '------------reviews')

    useEffect(() => {
        dispatch(getDetailByPlaceId(id))
        if(userId){
            dispatch(getPlaceToVisit())
            dispatch(getUserCart(userId ? userId.id : userId))
            // .then(() => setIsLoaded(true))
        }
    }, [dispatch, userId])

    if(Object.values(placeDetail).length === 0 || !placeDetail.Reviews){
        return(
            <p>loading...</p>
        )
    }

    let Avg = 0
    placeDetail.Reviews.forEach( ele => {
        Avg += ele.stars
    })

    let AvgStars = Avg/placeDetail.Reviews.length
    console.log(Avg, AvgStars)

    let Addedplace = []

    Object.values(placeVisitList).forEach(ele =>{
        Addedplace.push(ele.place_id)
    })
    console.log(Addedplace, '------------added')

    let Images = [fiveFlags, fiveFlags, waterimg, bronxZoo, natural, splish, aqua]

    //checking if place already exists in the cart
    let placeArr = []

    if(Object.values(cart).length){
        if(Object.values(cart.Items).length){
        Object.values(cart.Items).map(ele => {
            placeArr.push(ele.place_id)
        })

    }
    }

    console.log(placeArr, '---------placeArr')



    return(
        <>
        <div className="main-detail-pg">
            <div className="info-container">
                <div className="place-detail">
                    <div>
                        <h1>{placeDetail.Place.name}</h1>
                        <h3>{placeDetail.Place.activity_type}</h3>
                    </div>
                <div className="detail-review-address">
                    <div className="review">
                        {!AvgStars ? <div className="In-review">No Reviews <i class="fa-solid fa-star"></i></div> :
                        <div className="In-review"><i class="fa-solid fa-star"></i> {AvgStars.toFixed(2)}
                            <div className="no-review">
                                No. of Reviews: {placeDetail.Reviews.length}
                                {placeDetail.Reviews.length > 1 ?
                                <div>reviews</div> : <div>review</div>}
                            </div>
                        </div>}
                    </div>
                    <div className="address">
                        <div>
                            Street: {placeDetail.Place.address}
                        </div>
                        <div>
                            City: {placeDetail.Place.city}
                        </div>
                        <div>
                            State: {placeDetail.Place.state}
                        </div>
                    </div>
                </div>
                </div>
                <div className="detail-image">
                    {/* <img className="detail-photo" src={Images[placeDetail.Place.id]} alt="parkImg" /> */}
                    <img className="detail-photo" src={placeDetail.Place.img1} alt="parkImg" />
                </div>

            <div className="price-detail">
                <div>
                        Price: ${placeDetail.Place.price} per Ticket
                </div>
                <div>
                    {userId ? (placeArr.includes(placeDetail.Place.id) ?
                        <div>
                            Item already exists in your Cart
                        </div>
                    // <ItemQuantityForm id={placeDetail.Place.id} />
                    :
                        <div>
                            No. of Tickets:
                            <ItemQuantityForm id={placeDetail.Place.id} />
                        </div>
                    ) :
                    <button className="button1" onClick={() => history.push('/login')}>Add to Cart</button>}
                </div>
                <div className="detail-placeList">
                    {userId ?
                        <div>
                            {Addedplace.includes(placeDetail.Place.id) ?
                            <div>Place already exists in your
                            <NavLink exact to="/user/placeList"> List</NavLink> </div> :
                            <div><AddPlace place={placeDetail.Place}/></div>}
                        </div> :
                            <button className="button1" onClick={() => history.push('/login')}>
                            Add to Your List
                        </button>
                    }
                </div>
            </div>
        </div>

            <div className="review-detail">
                <div><h3>Reviews</h3></div>
                <div className="detail-review-info">
                    {placeDetail.Reviews.length}
                    {placeDetail.Reviews.length > 1 ?
                                'reviews' :
                                placeDetail.Reviews.length === 0 ?
                                    <div>No Reviews Yet</div> :
                                    <div> review</div>}
                </div>

                {placeDetail.Reviews.map(review => (
                    <div key={review.id} className="detail-single-review">
                        {/* {console.log(review)} */}
                        <div>
                            {review.review}
                        </div>
                        <div>
                            {review.stars} <i class="fa-solid fa-star"></i>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        </>
    )
}


export default DetailPg
