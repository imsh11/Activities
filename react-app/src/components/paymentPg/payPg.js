import React, { useState } from "react";

const PayPg = () => {

    const[cardHolderName, setCardHolderName] = useState('')
    const[cardNumber, setCardNumber] = useState('')
    const[expiration, setExpiration] = useState('')
    const[cvv, setCvv] = useState('')
    const[postalCode, setPostalCode] = useState('')
    const[email, setEmail] = useState('')

    return (
        <>
        <div>
            <div>
                CHECKOUT
            </div>
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
                                placeholder=""
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
        </div>
        </>
    )
}

export default PayPg