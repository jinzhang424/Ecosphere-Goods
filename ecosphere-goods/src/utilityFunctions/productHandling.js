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

export const addNewProduct = async (name, price, subcategory, image, category) => {
    const newProduct = {
        name: name,
        price: price,
        subcategory: subcategory,
        image: image,
        category: category
    }

    try {
        const response = await axios.post('http://localhost:5000/products/add-new-product', newProduct)
    } catch (error) {
        throw new Error(error.message || 'Error while adding new product')
    }
}

export const deleteProduct = async(productId) => {
    try {
        const response = await axios.delete('http://localhost:5000/products/delete-product', { 
            data: { productId }
        })
    } catch (error) {
        throw new Error(error.message || 'Error while adding new product')
    }
}

export const updateProduct = async(product, IDs) => {

    try {
        const response = await axios.put('http://localhost:5000/products/update-product', {
            productId: IDs.productId,
            priceId: IDs.priceId,
            name: product.name,
            imgUrl: product.imgUrl,
            price: product.price,
            category: product.category,
            subcategory: product.subcategory
        })
    } catch (error) {
        throw new Error(error.message || 'Error while updating product')
    }
}