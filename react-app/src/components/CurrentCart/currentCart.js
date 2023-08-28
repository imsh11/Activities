import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCart } from "../../store/cart";
import { getAllPlaces } from "../../store/places";
import UpdateQuantity from "../UpdateItemQuantity/updateQuantity";
import Update from "../UpdateItemQuantityModal/UpdateItemQuantityModal";
import DeleteItemCart from "../ItemDeleteModal/ItemDeleteModal";
import UpdatePayment from "../UpdatePayment/UpdatePayment";
import "./currentCart.css"
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom";
import { getPlaceToVisit } from "../../store/placeToVisit";
import waterimg from '../../images/water-park-photo.jpeg'
import fiveFlags from '../../images/fair-fairground-ferris-wheel-carousel-40547.jpeg'
import bronxZoo from '../../images/bronx-zoo.png'
import natural from '../../images/natural-history-museum.jpg'
import splish from '../../images/water-park-2.jpg'
import aqua from '../../images/aquarium.jpeg'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'


const CurrCart = () => {

    const dispatch = useDispatch()
    // const history = useHistory()

    const [isLoaded, setIsLoaded] = useState(false)

    const cart = useSelector(state => state.cart)
    const placeToVisit  = useSelector(state => state.placesList)
    // const cartItemLen = useSelector(state => Object.values(state.cart.Items))
    const places = useSelector(state => state.places)
    const cartTotal = useSelector(state => state.cart.Total)
    const userId = useSelector(state => state.session.user)
    console.log(cart, userId, places, cartTotal, placeToVisit,'--------stateCurr')
    console.log(placeToVisit, '-------------test')

    useEffect(() =>{
        dispatch(getUserCart(userId ? userId.id : userId))
        dispatch(getAllPlaces()).then(() => setIsLoaded(true))
        dispatch(getPlaceToVisit())
    }, [dispatch, userId])

    let Images = [fiveFlags, fiveFlags, waterimg, bronxZoo, natural, splish, aqua]

    if (!userId){
        return(
            <p>Please <NavLink exact to='/login'>Sign In</NavLink></p>
            )
    }

    if(!Object.values(cart).length){
        return(
            <p>Your Cart is Empty</p>
            )
        }

        let cartDetail = Object.values(cart.Items)
        console.log(cartDetail, cart.CartOder, '-------------cartDetail')

        //functions for left and right click
        const slideLeft = () => {
            let slider = document.getElementById('slider')
            slider.scrollLeft = slider.scrollLeft - 100
        }

        const slideRight = () => {
            let slider = document.getElementById('slider')
            slider.scrollLeft = slider.scrollLeft + 100
        }

    let activityType = []
    let placeInCartId = []
    let suggestedPlaces = []

    //place_id in cart gets pushed to placeInCartId
    if(cartDetail.length){
        cartDetail.map( item => {
            placeInCartId.push(item.place_id)
        })
    }

    //activity_type gets added to activityType
    if(placeInCartId.length && isLoaded){
        placeInCartId.forEach(place_id => {
            activityType.push(places[place_id].activity_type)
        })
    }

    //search place based on activity_type from activityType and add match
    //places to suggested places
    if(activityType.length){
        for( let i=0; i<activityType.length; i++){
            // suggestedPlaces.push(activityType[i])
            Object.values(places).forEach(pla =>{
                if(activityType[i] === pla.activity_type){
                    suggestedPlaces.push(pla)
                }
            })
        }
    }

    //splicing the place that is in cart
    if(suggestedPlaces.length){
        suggestedPlaces.forEach((place, i=0) =>{
            placeInCartId.forEach(id =>{
                if(place.id === id){
                    console.log(i ,'-----------------ture-----')
                    suggestedPlaces.splice(i, 1)
                }
            })
            i++
        })
    }

    console.log(placeInCartId, activityType, suggestedPlaces, typeof(placeInCartId[0]), '---------placeIN-------')

    return(
        <>
        {isLoaded &&(
        <div className="cart-main-container">
            <div className="cart-main-title">
                Shopping Cart
            </div>
        {cartDetail.length ?
        <>
        <div className="columns">
            <div className="item-list">
                {cartDetail.map( item => (
                <div key={item.id} className="cartList">
                        {/* {placeInCartId.push(item.place_id)} */}
                        {console.log(item, '---------item---------')}
                        <div className="main-heading">
                            <a href={`/place/${item.place_id}`}>
                                Tickets For {places[item.place_id].name}
                            </a>
                        </div>
                        <div className="qty">
                            Qunatity {item.quantity}
                        </div>
                            <div className="item-total">
                                Total: ${places[item.place_id].price * item.quantity}
                            </div>
                            <div className="updateBtn">
                                <Update item={item}/>
                            </div>
                            <div className="delbtn">
                                <DeleteItemCart id={item.id} />
                        </div>
                    </div>
                ))}
            </div>
                <div className="payment">
                        <div className="payBtn">
                            <UpdatePayment />
                        </div>
                                <div className="payCart">Cart Total: </div>
                                <div className="payTotal">${cartTotal.total}</div>
                                <div className="payItem">Items:</div>
                                <div className="payQty">{cartDetail.length}</div>
                </div>
            </div>
            <div className="cart-suggestion-box placeList-main">
                <div className="cart-suggestion-title empty-cart-main-heading">
                    Suggestions
                </div>
                <div className="placeList-inner">
                    <div className="row-card">
                        <MdChevronLeft className="arrowBtn" onClick={slideLeft} size={40}/>
                        <div id="slider" className="row-inner">
                            {suggestedPlaces.map(place => (
                                <div key={place.id} className="placeList-each placeList-selected">
                                    <div>
                                        <img className="place-img" src={place.img1}
                                        alt={place.name} />
                                    </div>
                                    <div className="place-name-empty-cart">
                                        <a href={`/place/${place.id}`}>
                                            {place.name}
                                        </a>
                                    </div>
                                    <div className="place-price-empty-cart">
                                        Price: ${place.price}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <MdChevronRight className="arrowBtn" onClick={slideRight} size={40}/>
                    </div>
                </div>
            </div>
            </>
            :
            <div className="empty-cart">
                <div className="inner-empty-cart">
                    <div className="empty-cart-text">
                        <span>
                            <span>
                                You don't have any Items in your cart. Let's get shopping!
                            </span>
                        </span>
                    </div>
                    <div className="empty-cart-button">
                        <a href="/">
                        <button className="start-shopping">
                            Start shopping
                        </button>
                            </a>
                    </div>
                    {Object.values(placeToVisit).length ?
                    <div className="placeList-main">
                        <div className="empty-cart-main-heading">
                            From Your Place List
                        </div>
                        <div className="placeList-inner">
                            <div className="row-card">
                            <MdChevronLeft className="arrowBtn" onClick={slideLeft} size={40}/>
                                <div id="slider" className="row-inner">
                            {Object.values(placeToVisit).map(place => (
                                <div key={place.id}>
                                <div className="placeList-each placeList-selected">
                                            {/* {console.log(place, '------------mapPlaceToVisit')} */}
                                            <div>
                                                <img className="place-img" src={Images[place.place_id]}
                                                alt={places[place.place_id]} />
                                            </div>
                                            <a href={`/place/${place.place_id}`}>
                                                <div className="place-name-empty-cart">
                                                    {places[place.place_id].name}
                                                </div>
                                            </a>
                                            <div className="place-price-empty-cart">
                                                Price: ${places[place.place_id].price}
                                            </div>
                                </div>
                            </div>
                            ))}
                                </div>
                                <MdChevronRight className="arrowBtn" onClick={slideRight} size={40}/>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="empty-cart-main-heading">
                        Your Place List is empty
                    </div>
                    }
                </div>
            </div>
            }
        </div>
        )}
        </>

    )
}

export default CurrCart
