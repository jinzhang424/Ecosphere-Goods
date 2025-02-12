import axios from "axios"

export const fetchCheckoutSessionID = async (idToken, cartItems, successUrl, cancelUrl, subtotal) => {

    const cartItemsIDs = cartItems.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity
    }))
    
    const response = await axios.get('/checkout/fetch-session-id', {
        params: {
            cartItemsIDs,
            successUrl,
            cancelUrl,
            subtotal
        },
        headers: {
            authorization: `Bearer ${idToken}`,
        },
    })

    return response.data.data
}