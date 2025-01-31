import axios from "axios"

export const fetchOrders = async (userID) => {
    const response = await axios.get('/order/fetch-orders', {
        params: {
            userID
        }
    })

    return response.data.data
}

export const fetchOrderByID = async (orderID, userID) => {

    const response = await axios.get(`/order/${userID}/${orderID}`)

    return response.data.data
}