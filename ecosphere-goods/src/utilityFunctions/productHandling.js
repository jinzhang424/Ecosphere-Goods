import axios from "axios";

export const fetchProducts = async (filters = [], minUnitCost = 0, maxUnitCost = Infinity, order = 'Newest') => {
    try {
        const response = await axios.get('http://localhost:5000/products/fetch-products', {
            params: {
                minUnitCost,
                maxUnitCost,
                filters,
                order
            },
        });

        return response.data.data
    } catch (error) {
        console.error('Error details:', error.response || error.message || error);
        throw new Error(error.response?.data?.message || 'Error occured while fetching products')
    }
}