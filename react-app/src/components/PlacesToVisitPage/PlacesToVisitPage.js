import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom";
import { getAllPlaces } from "../../store/places";
import { getPlaceToVisit } from "../../store/placeToVisit";
import UpdateStatusPlace from "../UpdateStatusPlaceToVisitModal/UpdateStatusModal";
import DeletePlace from "../PlaceDeleteFromPlaceList/PlaceDeleteModal";
import "./PlacesToVisitPage.css"


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
        <div>
            <h4>Hello {user.firstname}!</h4>
        </div>
            {Object.values(placeList).length ?
        <div>
            {placeList && Object.values(placeList).map(
                place => (
                    <div key={place.id} className="placeList">
                        <div>
                            Place: {place.place_id}
                        </div>
                        <div>
                            My Status: {place.status}
                        </div>
                        <div>
                            <UpdateStatusPlace place={place} />
                        </div>
                        <div>
                            <DeletePlace id={place.id} />
                        </div>
                    </div>

                ))}
        </div>:
        <div>You Can View Places <NavLink exact to="/">Here </NavLink>
            And Add Places You Plan on Visiting.</div>}
        </>
    )
}


export default UserPlaceList
