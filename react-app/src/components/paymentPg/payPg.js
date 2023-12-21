import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCart } from "../../store/cart";
import { getAllPlaces } from "../../store/places";

const PayPg = () => {

    const dispatch = useDispatch()

    const[cardHolderName, setCardHolderName] = useState('')
    const[cardNumber, setCardNumber] = useState('')
    const[expiration, setExpiration] = useState('')
    const[cvv, setCvv] = useState('')
    const[postalCode, setPostalCode] = useState('')
    const[email, setEmail] = useState('')
    const[isLoaded, setIsLoaded] = useState(false)

    // user
    const user = useSelector(state => state.session.user)
    const cart = useSelector(state => state.cart)
    const places = useSelector(state => state.places)
    console.log(user, cart, places,'-------payment')

    useEffect(() =>{
        if(user){
            dispatch(getAllPlaces())
            dispatch(getUserCart(user.id)).then(() => setIsLoaded(true))
        }
    }, [dispatch, user])

    //getting keys of places for the cart
    let plcKeys = []
    for(let keys in cart.Items){
        plcKeys.push(keys)
    }
    console.log(plcKeys, typeof(plcKeys[0]),'-----keys----')

    return (
        <>
        {isLoaded &&(
        <div>
            <div>
                <div>
                    {plcKeys.map( plc => (
                        <div key={plc}>
                            <div>
                                {places[plc].name}
                            </div>
                            <div>
                                Tickets: {cart.Items[plc].quantity}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                Cart Total ${cart.Total.total}
            </div>
        </div>
        )}
        <div>
            <div>
                CHECKOUT
            </div>
            <div>
                <div>
                    Payment Details
                </div>
                <div>
                    <div>
                        <div>
                            Cardholder Name
                        </div>
                        <div>
                            <label>
                                <input
                                id="cardHolderName"
                                required
                                placeholder=""
                                type="text"
                                value={cardHolderName}
                                onChange={e => setCardHolderName((e).target.value)}
                                />
                            </label>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div>
                                Card Number
                            </div>
                            <div>
                                <label>
                                    <input
                                    id="cardNumber"
                                    required
                                    placeholder=""
                                    type="number"
                                    value={cardNumber}
                                    onChange={e => setCardNumber((e).target.value)}
                                    />
                                </label>
                            </div>
                        </div>
                        <div>
                            <div>
                                Expiration
                            </div>
                            <div>
                                <label>
                                    <input
                                    id="expiration"
                                    required
                                    type="number"
                                    placeholder="MM/YY"
                                    value={expiration}
                                    onChange={(e) => setExpiration(e.target.value)}
                                    />
                                </label>
                            </div>
                        </div>
                        <div>
                            <div>
                                CVV
                            </div>
                            <div>
                                <label>
                                    <input
                                    id="cvv"
                                    required
                                    type="number"
                                    placeholder="123"
                                    value={cvv}
                                    onChange={(e) => setCvv(e.target.value)}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            Postal Code
                        </div>
                        <div>
                            <label>
                                <input
                                id="postalCode"
                                required
                                type="number"
                                placeholder="Postal or Zip code"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                />
                            </label>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <div>
                            Email
                        </div>
                        <div>
                            Your Tickets will be sent to the email below
                        </div>
                    </div>
                    <div>
                        <label>
                            <input
                            id="email"
                            required
                            type="text"
                            placeholder=""
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        </label>
                    </div>
                </div>
                <div>
                    <div>
                        <button>
                            Place Your Order
                        </button>
                    </div>
                    <div>
                        <button>
                            Return to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default PayPg