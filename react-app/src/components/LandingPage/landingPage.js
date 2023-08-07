import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { getAllPlaces } from "../../store/places";


const LandingPg = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const placeLst = useSelector(state => Object.values(state.places))
    console.log(placeLst, '----state')

    useEffect(() => {
        dispatch(getAllPlaces())
    }, [dispatch])

    if (placeLst.length === 0){
        return(
            <p>loading...</p>
        )
    }

    return(
        <>
            <h3>Places</h3>
            {/* <div>
                {placeLst.map( plc => (
                    <div>
                        {console.log(plc)}
                    </div>
                ))}
            </div> */}
        </>
    )
}


export default LandingPg;
