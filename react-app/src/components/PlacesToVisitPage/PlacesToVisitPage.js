import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom";
import { getAllPlaces } from "../../store/places";
import { getPlaceToVisit } from "../../store/placeToVisit";
import UpdateStatusPlace from "../UpdateStatusPlaceToVisitModal/UpdateStatusModal";
import DeletePlace from "../PlaceDeleteFromPlaceList/PlaceDeleteModal";
import "./PlacesToVisitPage.css"
import LoginFormModal from "../LoginFormModal";


const UserPlaceList = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const [isLoaded, setIsLoaded] = useState(false)

    const user = useSelector(state => state.session.user)
    const placeList = useSelector(state => state.placesList)
    const places = useSelector(state => state.places)
    // console.log(user, placeList, places, '---------user')

    useEffect(() => {
        dispatch(getAllPlaces()).then(() => setIsLoaded(true))
        dispatch(getPlaceToVisit())
    }, [dispatch, user])

    if(!user){
        return(
            <div className="no-user">
                {/* <p>Please Sign In</p> */}
                <div className="">
                    <LoginFormModal />
                </div>
                <div className="new-user">
                    <button className="sign-up-btn"
                        onClick={() => history.push('/signup')}
                    >
                        Create Your Account
                    </button>
                </div>
            </div>

        )
    }

    return(
        <>
        {isLoaded && (
        <div className="place-list-main">
            <div className="place-list-title">
                Place I Wish to Visit
            </div>
            <div className="place-list-user">
                Hello {user.firstname}!
            </div>
                {Object.values(placeList).length ?
            <div>
                {placeList && Object.values(placeList).map(
                    place => (
                        <div key={place.id} className="placeList">
                            <div className="placeList-img">
                                <img className="place-List-img" src={places[place.place_id].img1}
                                alt={places[place.place_id].name} />
                            </div>
                            <div className="placeList-detail">
                                <a className="place-list-name" href={`/place/${place.place_id}`}>
                                    {places[place.place_id].name}
                                </a>
                                <div className="place-list-address">
                                    Location: {places[place.place_id].address},&nbsp;
                                    {places[place.place_id].state},&nbsp;{places[place.place_id].zipcode}
                                </div>
                                <div className="place-list-price">
                                    ${places[place.place_id].price}
                                </div>
                            </div>
                            <div className="placeList-update">
                                <div className="status">
                                    Status: {place.status}
                                </div>

                                    <div className="place-updateBtn">
                                        <UpdateStatusPlace place={place} />
                                    </div>
                                    <div className="place-delBtn">
                                        <DeletePlace id={place.id} />

                                </div>

                            </div>

                        </div>
                    ))}
            </div>:
            <>
                <div className="empty-title">Your List is Empty</div>
                <div className="main-empty">
                </div>
                <div className="empty-list">You Can View Places&nbsp; <NavLink exact to="/">Here&nbsp;</NavLink> And
                Add Places You Plan on Visiting.</div>
            </>
            }
        </div>
        )}
        </>
    )
}


export default UserPlaceList
