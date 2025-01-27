import axios from "axios"

export const updateDeliveryInfo = async (userID, address, country, zipCode, phoneNumber) => {
    try {
        const response = await axios.post('http://localhost:5000/user-info/set-delivery-info', {
            userID, address, country, zipCode, phoneNumber
        })
    } catch (error) {
        throw new Error('Error while updating delivery address')
    }
}

export const fetchDeliveryInfo = async (userID) => {
    try {
        const response = await axios.get('http://localhost:5000/user-info/set-delivery-info', {
            params: {
                userID
            }
        })

        return response.data.data
    } catch (error) {
        console.log(error.message)
        throw new Error('Error while fetching delivery address')
    }
}