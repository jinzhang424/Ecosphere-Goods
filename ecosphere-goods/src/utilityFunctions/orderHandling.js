import axios from "axios"

export const fetchOrders = (userID) => {
    const response = axios.get('http://localhost:5000/order/fetch-orders', {
        params: {
            userID
        }
    })

    return response.data.data
}
