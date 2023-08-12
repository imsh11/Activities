import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { getAllPlaces } from "../../store/places";
import { getPlaceToVisit } from "../../store/placeToVisit";


const UserPlaceList = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const user = useSelector(state => state)
    console.log(user)

    useEffect(() => {
        dispatch(getPlaceToVisit())
    }, [dispatch])

    return(
        <>
            Test
        </>
    )
}
