import axios from "axios"

export const fetchOrders = async (idToken) => {
    try {
        const response = await axios.get('/order/fetch-orders', {
            headers: {
                Authorization: `Bearer ${idToken}`
            }
        })

        return response.data.data

    } catch (error) {
        console.error(error.message)
        throw new Error('Error while fetching orders')
    }
}

export const fetchOrderByID = async (orderID, idToken) => {

    try {
        const response = await axios.get(`/order/${orderID}`, {
            headers: {
                Authorization: `Bearer ${idToken}`
            }
        })

        return response.data.data

    } catch (error) {
        console.error(error.message)
        throw new Error('Error while fetching order id')
    }
}