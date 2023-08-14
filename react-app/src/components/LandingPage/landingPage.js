import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom";
import { getAllPlaces } from "../../store/places";
import waterimg from '../../images/water-park-photo.jpeg'
import fiveFlags from '../../images/fair-fairground-ferris-wheel-carousel-40547.jpeg'
import bronxZoo from '../../images/bronx-zoo.png'
import natural from '../../images/natural-history-museum.jpg'
import splish from '../../images/water-park-2.jpg'
import aqua from '../../images/aquarium.jpeg'
import './landingPage.css'


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

    let Images = [fiveFlags, fiveFlags, waterimg, bronxZoo, natural, splish, aqua]

    return(
        <>
            <h3>Places</h3>
            <div className="landing-map">
                {placeLst.map( plc => (
                <>
                    <div key={plc.id} className="landing-list">
                        <NavLink to={`/place/${plc.id}`}>
                    <div className="landing-info">
                        Name: {plc.name}
                        <div>
                            Street: {plc.address}
                            <div>
                                City: {plc.city}
                                State: {plc.state}
                            </div>
                        </div>
                        <div>
                            Ticket Price:
                            ${plc.price}
                        </div>
                    </div>
                    <div className="landing-image">
                    <img className="landing-photo" src={Images[plc.id]} alt="parkImg" />
                    </div>
                    </NavLink>
                    </div>
                </>

                ))}
            </div>
        </>
    )
}


export default LandingPg;
