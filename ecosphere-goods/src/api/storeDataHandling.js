import axios from "axios"

export const fetchMonthlyRevenueData = async () => {
    try {
        const response = await axios.get('/store-data/monthly-revenue')
        return response.data.data
    } catch (error) {
        console.error(error.message)
        throw new Error(error.message)
    }
}