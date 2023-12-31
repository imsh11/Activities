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
import LoginFormModal from "../LoginFormModal";


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
    // console.log(cart, userId, places, cartTotal, placeToVisit,'--------stateCurr')
    // console.log(placeToVisit, '-------------test')

    useEffect(() =>{
        dispatch(getUserCart(userId ? userId.id : userId))
        dispatch(getAllPlaces()).then(() => setIsLoaded(true))
        dispatch(getPlaceToVisit())
    }, [dispatch, userId])

    let Images = [fiveFlags, fiveFlags, waterimg, bronxZoo, natural, splish, aqua]

    if (!userId){
        return(
            <>
            {/* <p>Please <NavLink exact to='/login'>Sign In</NavLink></p> */}
            <div className="no-user">
                <div>
                    <LoginFormModal />
                </div>
                <div className="new-user">
                    {/* <button className="sign-up-btn"
                        onClick={() => history.push('/signup')}
                    >
                        Create Your Account
                    </button> */}
                    <NavLink exact to='/signup'><b>Create a New Account</b></NavLink>
                </div>
            </div>
            </>
            )
    }

    if(!Object.values(cart).length){
        return(
            <p>Your Cart is Empty</p>
            )
        }

        let cartDetail = Object.values(cart.Items)
        // console.log(cartDetail, cart.CartOder, '-------------cartDetail')

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
    let final = []

    //place_id in cart gets pushed to placeInCartId
    if(cartDetail.length){
        cartDetail.map( item => {
            placeInCartId.push(item.place_id)
        })
    }

    //activity_type gets added to activityType
    //also checking if an activity type already exists
    if(placeInCartId.length && isLoaded){
        placeInCartId.forEach(place_id => {
            if(!activityType.includes(places[place_id].activity_type)){
                activityType.push(places[place_id].activity_type)
            }
        })
    }

    //search place based on activity_type from activityType and add match
    //places to suggested places
    if(activityType.length){
        for( let i=0; i<activityType.length; i++){
            // suggestedPlaces.push(activityType[i])
            Object.values(places).forEach(pla =>{
                if(activityType[i] === pla.activity_type){
                    // console.log(pla, suggestedPlaces, '----------place')
                    suggestedPlaces.push(pla)
                    // console.log(suggestedPlaces, '---------after adding')
                }
            })
        }
    }
    // console.log(suggestedPlaces, '------before splice')
    //splicing the place that is in cart
    if(suggestedPlaces.length){
        // suggestedPlaces.forEach((place, i=0) =>{
        //     placeInCartId.forEach(id =>{
        //         console.log(id, place.id,'place.id')
        //         if(place.id === id){
        //             console.log(i,id, place.id,'-----------------ture-----')
        //             // final.push(place)
        //             suggestedPlaces.splice(i, 1)
        //         }
        //     })
        //     i++
        // })

        for(let i=0; i<suggestedPlaces.length; i++){
            // console.log(suggestedPlaces[i], '--------iLoop')
            for(let j=0; j<placeInCartId.length; j++){
                // console.log(placeInCartId[j], '---------jLoop')
                if(suggestedPlaces[i].id === placeInCartId[j]){
                    suggestedPlaces.splice(i, 1)
                }
            }
        }
    }

    // console.log(placeInCartId, activityType, suggestedPlaces,
    //     typeof(placeInCartId[0]), final, '---------placeIN-------')

    return(
        <>
        {isLoaded &&(
        <div className="cart-main-container">

        {cartDetail.length ?
        <>
        <div className="columns">

            <div className="item-list">
                <div className="cart-main-title">
                Shopping Cart
                </div>
                {cartDetail.map( item => (
                <div key={item.id} className="cartList">
                        {/* {placeInCartId.push(item.place_id)} */}
                        {/* {console.log(item, '---------item---------')} */}
                        <div className="cart-item-pic">
                            <img className="item-place-img" src={places[item.place_id].img1}
                            alt={places[item.place_id].name} />
                        </div>
                        <div className="cart-item-content">
                            <div className="main-heading">
                                <a href={`/place/${item.place_id}`}>
                                    Tickets For {places[item.place_id].name}
                                </a>
                            </div>
                                    <div className="item-total">
                                        Total: ${places[item.place_id].price * item.quantity}
                                    </div>
                                <div className="cart-items-buttons">
                                    <div className="qty">
                                        Qunatity: {item.quantity}
                                    </div>
                                    <div className="updateBtn">
                                        <Update item={item}/>
                                    </div>
                                    <div className="delbtn">
                                        <DeleteItemCart id={item.id} />
                                    </div>
                                </div>
                            </div>
                        </div>
                ))}
                <div className="item-list-end">
                    Subtotal ({cartDetail.length} items): ${cartTotal.total}
                </div>
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
                    Similar Places
                </div>
                <div className="placeList-inner">
                {suggestedPlaces.length?
                    <div className="row-card">
                        <MdChevronLeft className="arrowBtn" onClick={slideLeft} size={40}/>
                        <div id="slider" className="row-inner">
                            {suggestedPlaces.map(place => (
                                <div key={place.id} className="placeList-each placeList-selected">
                                    <div className="suggestion-img">
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
                    :
                    <div className="cart-no-suggestions">
                        No Suggestions
                    </div>
                }
                </div>
            </div>
            </>
            :
            <div className="empty-cart">
                <div className="inner-empty-cart">
                    <div className="empty-cart-content">
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
                                            <div className="suggestion-img">
                                                <img className="place-img" src={places[place.place_id].img1}
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
