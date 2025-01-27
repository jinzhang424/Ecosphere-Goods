import axios from "axios"

export const fetchCheckoutSessionID = async (userID, cartItems, successUrl, cancelUrl, subtotal) => {

    const cartItemsIDs = cartItems.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity
        }))
    
    const response = await axios.get('http://localhost:5000/checkout/fetch-session-id', {
        params: {
            userID,
            cartItemsIDs,
            successUrl,
            cancelUrl,
            subtotal
        }
    })

    return response.data.data
}