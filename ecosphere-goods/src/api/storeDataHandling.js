import axios from "axios"

export const fetchMonthlyRevenueData = async (idToken) => {
    try {
        const response = await axios.get('/store-data/monthly-revenue', {
            headers: {
                Authorization: `Bearer ${idToken}`
            }
        })
        return response.data.data
    } catch (error) {
        console.error(error.message)
        throw new Error(error.message)
    }
}