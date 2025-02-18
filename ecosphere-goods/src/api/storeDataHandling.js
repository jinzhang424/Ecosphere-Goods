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

export const fetchCategoricalSalesData = async (idToken) => {
    try {
        const response = await axios.get('/store-data/categorical-sales', {
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

export const fetchProductSalesData = async (idToken) => {
    try {
        const response = await axios.get('/store-data/product-sales', {
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

export const fetchProductRevenueData = async (idToken) => {
    try {
        const response = await axios.get('/store-data/product-revenue', {
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

export const fetchUserTraffic = async (idToken) => {
    try {
        const response = await axios.get('/store-data/user-traffic', {
            headers: {
                Authorization: `Bearer ${idToken}`
            }
        })

        console.log(response.data)
        return response.data.data
    } catch (error) {
        throw new Error(error.message)
    }
}