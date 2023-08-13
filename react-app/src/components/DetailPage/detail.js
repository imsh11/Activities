import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom/cjs/react-router-dom";
import { getDetailByPlaceId } from "../../store/places";
import ItemQuantityForm from "../ItemQuantityForm/ItemQuantityForm";
import AddPlace from "../AddPlaceToVisit/AddPlaceToVisit";
import { getPlaceToVisit } from "../../store/placeToVisit";

const DetailPg = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const {id} = useParams()
    const placeDetail = useSelector(state => state.places)
    const userId = useSelector(state => state.session.user)
    const placeVisitList = useSelector(state => state.placesList)
    console.log((placeDetail), id, typeof(id),'--------stateID')
    console.log(placeDetail.Reviews, placeVisitList, userId, '------------reviews')

    useEffect(() => {
        dispatch(getDetailByPlaceId(id))
        dispatch(getPlaceToVisit())
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


    return(
        <>
            <div>
                <div>
                    <h1>{placeDetail.Place.name}</h1>
                    <h3>{placeDetail.Place.activity_type}</h3>
                </div>
                <div>
                    <div>
                        {!AvgStars ? <div>No Reviews</div> :
                        <div>{AvgStars.toFixed(2)}
                            <div>
                                {placeDetail.Reviews.length}
                                {placeDetail.Reviews.length > 1 ?
                                <div>reviews</div> : <div>review</div>}
                            </div>
                        </div>}
                    </div>
                    <div>
                        <div>
                            {placeDetail.Place.address}
                        </div>
                        <div>
                            {placeDetail.Place.city}
                        </div>
                        <div>
                            {placeDetail.Place.state}
                        </div>
                    </div>
                </div>
                <div>
                        ${placeDetail.Place.price} One day
                </div>
                <div>
                    {userId ? <ItemQuantityForm id={placeDetail.Place.id} /> :
                    <button onClick={() => history.push('/login')}>Add to Cart</button>}

                </div>
                <div>
                    {userId ?
                        <div>
                            {Addedplace.includes(placeDetail.Place.id) ?
                            <div>Place already exists in your
                            <NavLink exact to="/user/placeList"> List</NavLink> </div> :
                            <div><AddPlace place={placeDetail.Place}/></div>}
                        </div> :
                            <button onClick={() => history.push('/login')}>
                            Add to Your List
                        </button>
                    }


                </div>
            </div>

            <div>
                <div>Reviews</div>
                <div>
                    {placeDetail.Reviews.length}
                    {placeDetail.Reviews.length > 1 ?
                                <div>reviews</div> :
                                placeDetail.Reviews.length === 0 ?
                                    <div>No Reviews Yet</div> :
                                    <div>review</div>}
                </div>

                {placeDetail.Reviews.map(review => (
                    <div key={review.id}>
                        {/* {console.log(review)} */}
                        <div>
                            {review.review}
                        </div>
                        <div>
                            {review.stars}
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}


export default DetailPg
