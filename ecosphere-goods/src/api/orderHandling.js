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

export const fetchOrderByID = async (uid, orderID, idToken) => {

    try {
        const response = await axios.get(`/order/${uid}/${orderID}`, {
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

export const updateOrderStatus = async (orderID, uid, newOrderStatus, idToken) => {
    try {
        const response = await axios.patch(`/order/update-order-status/${uid}/${orderID}`, 
            {
                newOrderStatus
            },
            {
                headers: {
                    Authorization: `Bearer ${idToken}`
                }
            }
        )

        return response.data.data

    } catch (error) {
        console.error(error.message)
        throw new Error('Error while fetching order id')
    }
}