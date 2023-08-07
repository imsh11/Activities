import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { getAllPlaces } from "../../store/places";


const LandingPg = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const placeLst = useSelector(state => state)
    console.log(placeLst, '----state')

    useEffect(() => {
        dispatch(getAllPlaces())
    }, [dispatch])

    return(
        <>
            Testing
        </>
    )
}


export default LandingPg;
