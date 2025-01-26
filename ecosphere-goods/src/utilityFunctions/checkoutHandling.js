import axios from "axios"

export const fetchCheckoutSessionID = async (userID, cartItems, successUrl, cancelUrl, subtotal) => {
    const response = await axios.get('http://localhost:5000/checkout/fetch-session-id', {
        params: {
            userID,
            cartItems,
            successUrl,
            cancelUrl,
            subtotal
        }
    })

    return response.data.data
}