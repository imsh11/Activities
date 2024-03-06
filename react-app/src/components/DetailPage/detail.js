import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom/cjs/react-router-dom";
import { getDetailByPlaceId } from "../../store/places";
import ItemQuantityForm from "../ItemQuantityForm/ItemQuantityForm";
import AddPlace from "../AddPlaceToVisit/AddPlaceToVisit";
import { getPlaceToVisit } from "../../store/placeToVisit";
import waterimg from '../../images/water-park-photo.jpeg'
import fiveFlags from '../../images/fair-fairground-ferris-wheel-carousel-40547.jpeg'
import bronxZoo from '../../images/bronx-zoo.png'
import natural from '../../images/natural-history-museum.jpg'
import splish from '../../images/water-park-2.jpg'
import aqua from '../../images/aquarium.jpeg'
import "./detail.css"
import { getUserCart } from "../../store/cart";
import ImageSlider from "../imageSlider/ImageSlider";
import { GoogleMap, useJsApiLoader, useLoadScript } from "@react-google-maps/api";

const DetailPg = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const [isLoaded, setIsLoaded] = useState(false)

    // sets center of the map
    const [currentPosition, setCurrentPosition] = useState({lat:43.11016617798622,lng:-89.48826131670266})
    const [map, setMap] = useState(null)

    const { isLoadedGoogle } = useLoadScript({
        // id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API
    })

    // const { isLoadedGoogle } = useJsApiLoader({
    //     id: 'google-map-script',
    //     googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API
    // })

    const onUnmount = useCallback(function callback(map){
        setMap(null)
    }, [])

    const {id} = useParams()
    const placeDetail = useSelector(state => state.places)
    const userId = useSelector(state => state.session.user)
    const placeVisitList = useSelector(state => state.placesList)
    const cart = useSelector(state => state.cart)
    const allUsers = useSelector(state => state.Users)
    console.log(allUsers, '-----------allUsers state')
    // console.log((placeDetail), id, typeof(id), cart,'--------stateID')
    // console.log(placeDetail.Reviews, placeVisitList, userId, '------------reviews')

    useEffect(() => {
        dispatch(getDetailByPlaceId(id))
        if(userId){
            dispatch(getPlaceToVisit())
            dispatch(getUserCart(userId ? userId.id : userId))
            // .then(() => setIsLoaded(true))
        }
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
    // console.log(Avg, AvgStars)

    let Addedplace = []

    Object.values(placeVisitList).forEach(ele =>{
        Addedplace.push(ele.place_id)
    })
    // console.log(Addedplace, '------------added')

    // let Images = [fiveFlags, fiveFlags, waterimg, bronxZoo, natural, splish, aqua]
    let imgtest = "https://allears.net/wp-content/uploads/2019/04/Six-Flags-Promo.jpeg"
    let slides = [
        {url: placeDetail.Place.img1, title: "img1"},
        {url: placeDetail.Place.img2, title: 'img2'},
        {url: placeDetail.Place.img3, title: 'img3'},
        {url: placeDetail.Place.img4, title: 'img4'},
        {url: placeDetail.Place.img5, title: 'img5'}
    ]
    // console.log(slides, '------images------------')

    //checking if place already exists in the cart
    let placeArr = []

    if(Object.values(cart).length){
        if(Object.values(cart.Items).length){
        Object.values(cart.Items).map(ele => {
            placeArr.push(ele.place_id)
        })

    }
    }

    // console.log(placeArr, '---------placeArr')

    const containerStyles = {
        width: "90%",
        height: "700px",
        margin: "0 auto",
    };

    const containerStyleGoogle = {
        width: '800px',
        height: '800px'
    }

    const mapEmbeded = [
        'blank',
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3050.2791829227945!2d-74.44103381520557!3d40.13606449916736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c164831c62ca1d%3A0x2bd60c6088332f46!2sSix%20Flags%20Great%20Adventure!5e0!3m2!1sen!2sus!4v1696688506663!5m2!1sen!2sus" width='600' height="350" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>,
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3030.3305332190444!2d-75.53568112423658!3d40.57845894578056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c4309b3e647929%3A0x4ecce74a41b8eb22!2sDorney%20Park%20%26%20Wildwater%20Kingdom!5e0!3m2!1sen!2sus!4v1696688922779!5m2!1sen!2sus" width='600' height="350" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>,
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3017.9899008224484!2d-73.87929662422349!3d40.85014552914735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2f483516ad28b%3A0x56eb41c9795102e!2sBronx%20Zoo!5e0!3m2!1sen!2sus!4v1696689357980!5m2!1sen!2sus" width='600' height="350" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>,
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3105.4304702599643!2d-77.02864032431611!3d38.89127034706608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7b798ecb5b2c7%3A0xc7edf0c4a86f75af!2sSmithsonian%20National%20Museum%20of%20Natural%20History!5e0!3m2!1sen!2sus!4v1696689653035!5m2!1sen!2sus" width='600' height="350" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>,
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3014.7602603815058!2d-72.73186102396386!3d40.92100217136285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e86075773c1915%3A0xfd06facaa6f212c6!2sSplish%20Splash%20Water%20Park!5e0!3m2!1sen!2sus!4v1696689756643!5m2!1sen!2sus" width='600' height="350" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>,
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3030.5300262046026!2d-73.97850002423687!3d40.57405464604945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c244360f1e1371%3A0x45f54e3a5017dbdc!2sNew%20York%20Aquarium!5e0!3m2!1sen!2sus!4v1696688199630!5m2!1sen!2sus" width='600' height="350" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>,
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.0267339369752!2d-73.98019652422784!3d40.761436734588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258f97bdb102b%3A0xea9f8fc0b3ffff55!2sThe%20Museum%20of%20Modern%20Art!5e0!3m2!1sen!2sus!4v1696689938765!5m2!1sen!2sus" width='600' height="350" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>,
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3026.125201216097!2d-73.9662055242321!3d40.67121024011219!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25b0a449c39c9%3A0xc62355aa46c985fa!2sBrooklyn%20Museum!5e0!3m2!1sen!2sus!4v1696690018633!5m2!1sen!2sus" width='600' height="350" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>,
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.2080238294093!2d-73.96581892422692!3d40.7794406334846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25896f660c26f%3A0x3b2fa4f4b6c6a1fa!2sThe%20Metropolitan%20Museum%20of%20Art!5e0!3m2!1sen!2sus!4v1696690080169!5m2!1sen!2sus" width='600' height="350" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>,
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3058.8728085314974!2d-75.13313987426686!3d39.944234634262!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6c8f2bf604d05%3A0x1fe706436a408dac!2sAdventure%20Aquarium!5e0!3m2!1sen!2sus!4v1696690157828!5m2!1sen!2sus"  width='600' height="350" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>,
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3031.273074268819!2d-74.30116612423764!3d40.5576465470511!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c3b56ac9854fd7%3A0x8fa1883119657367!2sSeaQuest%20Woodbridge!5e0!3m2!1sen!2sus!4v1696690261087!5m2!1sen!2sus" width='600' height="350" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

    ]



    return(
        <>
        <div className="main-detail-pg">
            <div className="info-container">
                <div className="place-detail">
                        <div className="place-title">{placeDetail.Place.name}</div>
                </div>
                <div className="detail-review-address">
                    <div className="review">
                        {!AvgStars ? <div className="rev"><i className="fa-solid fa-star"></i> No Reviews </div> :
                        <div className="review">
                            <div className="rev"><i className="fa-solid fa-star"></i> {AvgStars.toFixed(2)}</div>
                            <div className="review">
                                <div>&nbsp;{placeDetail.Reviews.length}&nbsp;</div>
                                {placeDetail.Reviews.length > 1 ?
                                <div className="rev">reviews</div> : <div className="rev">review</div>}
                            </div>
                        </div>}
                    </div>
                    <div className="address">
                        <div>
                        &nbsp;{placeDetail.Place.city},
                        </div> &nbsp;
                        <div>
                            {placeDetail.Place.state}
                        </div>
                    </div>
                {/* </div> */}
                </div>
            </div>
                {/* <div className="detail-image"> */}
                {/* <div style={containerStyles}> */}
                        <div style={containerStyles}>
                            <ImageSlider slides={slides} />
                        {/* </div> */}
                    {/* {[placeDetail.Place.img1, placeDetail.Place.img2, placeDetail.Place.img3]} */}
                    {/* <div className="main-pic">
                        <img className="detail-photo" src={placeDetail.Place.img1} alt="parkImg" />
                    </div>
                    <div className="all-pic">
                        <div>
                            <img className="detail-photo2" src={placeDetail.Place.img2} alt="parkImg" />
                        </div>
                        <div>
                            <img className="detail-photo3" src={placeDetail.Place.img3} alt="parkImg" />
                        </div>
                        <div className="picEnd">
                            <img className="detail-photo4" src={placeDetail.Place.img4} alt="parkImg" />
                        </div>
                        <div className="picEnd">
                            <img className="detail-photo5" src={placeDetail.Place.img5} alt="parkImg" />
                        </div>
                    </div> */}
                </div>
            <div className="price-review-container">
                <div className="price-detail">
                    <div>
                            <b>${placeDetail.Place.price} per Ticket</b>
                    </div>
                    <div>
                        {userId ? (placeArr.includes(placeDetail.Place.id) ?
                            <div>
                                Item already exists in your Cart
                            </div>
                        // <ItemQuantityForm id={placeDetail.Place.id} />
                        :
                            <div>
                                No. of Tickets:
                                <ItemQuantityForm id={placeDetail.Place.id} />
                            </div>
                        ) :
                        <button className="button1" onClick={() => history.push('/login')}>Add to Cart</button>}
                    </div>
                    <div className="detail-placeList">
                        {userId ?
                            <div>
                                {Addedplace.includes(placeDetail.Place.id) ?
                                <div>Place already exists in your
                                <NavLink exact to="/user/placeList"> List</NavLink> </div> :
                                <div><AddPlace place={placeDetail.Place}/></div>}
                            </div> :
                                <button className="button1" onClick={() => history.push('/login')}>
                                Add to Your List
                            </button>
                        }
                    </div>
                </div>

                <div className="review-detail">
                    <div><h3>Reviews</h3></div>
                    <div className="detail-review-info">
                        {placeDetail.Reviews.length} &nbsp;
                        {placeDetail.Reviews.length > 1 ?
                                    'reviews' :
                                    placeDetail.Reviews.length === 0 ?
                                        <div>Reviews Yet</div> :
                                        'review'}
                    </div>
                    {placeDetail.Reviews.map(review => (
                        <div key={review.id} className="detail-single-review">
                            {console.log(review)}
                            <div>
                                <div>
                                    <span class="material-symbols-outlined">
                                        account_circle
                                    </span>
                                </div>
                                <div style={{fontWeight: 'bold'}}>
                                    {allUsers[review.user_id].lastname},&nbsp;
                                    {allUsers[review.user_id].firstname[0]}
                                </div>
                            </div>
                            <div style={{fontStyle: 'italic'}}>
                                {review.review}
                            </div>
                            <div>
                                {/* {review.stars} <i class="fa-solid fa-star"></i> */}
                                {[...Array(review.stars)].map((ele, i) =>
                                    (<i class="fa-solid fa-star" style={{color: "#f0b52b"}} key={i}></i>))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div className="embdedMap">
            <div className="title">Info</div>
            <div style={{fontWeight: 'bold', marginBottom: '5px', marginLeft: '20px', marginTop: '10px'}}>Map</div>
            <div style={{margin: '20px'}}>
                <div className="map-responsive">
                    {mapEmbeded[placeDetail.Place.id]}
                </div>
            </div>
            <div>
                {/* <div style={{fontWeight: 'bold', marginBottom: '5px', marginLeft: '20px'}}>Floor Plan</div> */}

            </div>

        </div>

        {/* <div className="map_page__container">
            <div style={{height: '900px', width: '900px'}}>
                {isLoadedGoogle && <GoogleMap
                mapContainerStyle={containerStyleGoogle}
                zoom={8}
                center={currentPosition}
                // onUnmount={onUnmount}
                >
                </GoogleMap>}
            </div>
        </div> */}

        </>
    )
}


export default DetailPg
