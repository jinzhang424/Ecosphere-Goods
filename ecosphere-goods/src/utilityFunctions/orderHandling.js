import axios from "axios"

export const fetchOrders = async (userID) => {
    const response = await axios.get('http://localhost:5000/order/fetch-orders', {
        params: {
            userID
        }
    })

    return response.data.data
}

export const fetchOrderByID = async (orderID, userID) => {
    const response = await axios.get('http://localhost:5000/order/fetch-order-by-id', {
        params: {
            userID,
            orderID
        }
    })

    return response.data.data
}