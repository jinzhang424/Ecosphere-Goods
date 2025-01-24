import axios from "axios"

export const fetchOrders = async (userID) => {
    const response = await axios.get('http://localhost:5000/order/fetch-orders', {
        params: {
            userID
        }
    })

    return response.data.data
}
