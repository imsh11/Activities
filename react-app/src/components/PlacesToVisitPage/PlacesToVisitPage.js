import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { getAllPlaces } from "../../store/places";
import { getPlaceToVisit } from "../../store/placeToVisit";


const UserPlaceList = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const user = useSelector(state => state.session.user)
    const placeList = useSelector(state => state.placesList)
    console.log(user, placeList,  '---------user')

    useEffect(() => {
        dispatch(getPlaceToVisit())
    }, [dispatch, user])

    if(!user){
        return(
            <p>Please Sign In</p>
        )
    }

    return(
        <>
        <div>
            <h2>Place I Wish to Visit</h2>
        </div>
            {Object.values(placeList).length ?
        <div>
            {placeList && Object.values(placeList).map(
                place => (
                    <div key={place.id}>
                        <div>
                            Place: {place.place_id}
                        </div>
                        <div>
                            My Status: {place.status}
                        </div>
                    </div>

                ))}
        </div>:
        <div>You Can Add Places Here You Plan on Visiting</div>}
        </>
    )
}


export default UserPlaceList
