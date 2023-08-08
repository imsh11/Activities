import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom";
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
            <div>
                {placeLst.map( plc => (
                    <div>
                        <NavLink to={`/place/${plc.id}`}>
                            <div>
                        {plc.name}
                        <div>
                            {plc.address}
                            <div>
                                {plc.city}
                                {plc.state}
                            </div>
                        </div>
                        <div>
                            {plc.product}
                            {plc.price}
                        </div>
                    </div>
                    </NavLink>
                    </div>


                ))}
            </div>
        </>
    )
}


export default LandingPg;
