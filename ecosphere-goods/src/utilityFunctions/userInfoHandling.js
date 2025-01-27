export const updateDeliveryInfo = async (userID, address, country, zipCode, phoneNumber) => {
    try {
        const response = await axios.post('http://localhost:5000/user-info/set-delivery-address', {
            userID, address, country, zipCode, phoneNumber
        })
    } catch (error) {
        throw new Error('Error while updating delivery address')
    }
}