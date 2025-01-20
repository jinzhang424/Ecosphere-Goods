import axios from "axios";
import PriceFilter from "../components/Filter/PriceFilter";

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

export const addNewProduct = async (name, price, subcategory, image) => {
    const newProduct = {
        name: name,
        price: price,
        subcategory: subcategory,
        image: image
    }

    console.log('new product params:', newProduct)

    try {
        const response = await axios.post('http://localhost:5000/products/add-new-product', newProduct)
    } catch(error) {
        throw new Error(error.message || 'Error while adding new product')
    }
}