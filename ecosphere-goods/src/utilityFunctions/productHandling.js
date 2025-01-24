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

export const addNewProduct = async (name, price, subcategory, image, category, userID) => {
    try {
        const response = await axios.post('http://localhost:5000/products/add-new-product', {
            name,
            price,
            subcategory,
            image,
            category,
            userID
        })
    } catch (error) {
        throw new Error(error.message || 'Error while adding new product')
    }
}

export const deleteProduct = async(productId, userID) => {
    try {
        const response = await axios.delete('http://localhost:5000/products/delete-product', { 
            data: { productId, userID }
        })
    } catch (error) {
        throw new Error(error.message || 'Error while adding new product')
    }
}

export const updateProduct = async(product, IDs, userID) => {

    try {
        const response = await axios.put('http://localhost:5000/products/update-product', {
            productId: IDs.productId,
            priceId: IDs.priceId,
            name: product.name,
            imgUrl: product.imgUrl,
            price: product.price,
            category: product.category,
            subcategory: product.subcategory,
            userID
        })
    } catch (error) {
        throw new Error(error.message || 'Error while updating product')
    }
}