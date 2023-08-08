import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom";
import { getDetailByPlaceId } from "../../store/places";

const DetailPg = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const {id} = useParams()
    const placeDetail = useSelector(state => state.places)
    console.log((placeDetail), id, typeof(id),'--------stateID')
    console.log(placeDetail.Reviews, '------------reviews')

    useEffect(() => {
        dispatch(getDetailByPlaceId(id))
    }, [dispatch])

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
                    ${placeDetail.Place.price} for Today
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
                        {console.log(review)}
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
