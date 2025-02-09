import React, { createContext, useEffect, useState } from 'react';
import { addNewProduct, fetchProductById, fetchProducts, updateProduct } from '../../utilityFunctions/productHandling';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { toast } from "react-toastify";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import { deleteProduct } from '../../utilityFunctions/productHandling';

const ProductCatalogContext = createContext();

const ProductCatalogProvider = ({ children }) => {
    const user = useSelector(selectUser)
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const [image, setImage] = useState(null)
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [products, setProducts] = useState([])
    const [loadingProducts, setLoadingProducts] = useState(true)

    const removeProductFromProducts = (productId) => {
        setProducts(prevProducts => prevProducts.filter(product => product.id !== productId))
    }

    const addProductToProducts = async (productId) => {
        const newProduct = await fetchProductById(productId)
        setProducts(prevProducts => [...prevProducts, newProduct])
    }

    const handleAddProduct = async () => {
        try {
            const storageRef = ref(storage, `images/${Date.now()}`);
            await uploadString(storageRef, image, 'data_url');
            const imageUrl = await getDownloadURL(storageRef);
        
            const productId = await addNewProduct(name, price, subcategory, imageUrl, category, user.uid)
            await addProductToProducts(productId)

            toast.success('Successfully added new product.')
        } catch (error) {
            console.error(error.message);
            toast.error('Error adding new product.')
        }
    }

    const handleUpdateProduct = async (IDs) => {
        try {
            const product = {
                name: name,
                imgUrl: image,
                price: price,
                category: category,
                subcategory: subcategory
            }
        
            await updateProduct(product, IDs, user.uid)
            
            removeProductFromProducts(IDs.productId)
            await addProductToProducts(IDs.productId)


            toast.success('Successfully updated product.')
        } catch (error) {
            console.error(error.message)
            toast.error('Error updating product.')
        }
    }

    const handleConfirmDelete = async (event, productId) => {
        event.preventDefault();

        try {
            await deleteProduct(productId, user.uid)
            removeProductFromProducts(productId)

            toast.success('Successfully deleted product.')
        } catch (error) {
            console.error(error.message);
            toast.error('Failed to delete product.')
        }
    };

    useEffect(() => {
        const getProducts = async () => {
            const products = await fetchProducts(undefined, undefined, undefined, 'Newest')
            setProducts(products)

            setLoadingProducts(false)
        }

        getProducts()
    }, [])

    return (
        <ProductCatalogContext.Provider 
            value={{ 
                category, setCategory, 
                subcategory, setSubcategory, 
                image, setImage, 
                name, setName, 
                price, setPrice,
                products, setProducts,
                loadingProducts,
                
                handleAddProduct,
                handleUpdateProduct,
                handleConfirmDelete
            }}
        >
            {children}
        </ProductCatalogContext.Provider>
    );
};

export { ProductCatalogContext, ProductCatalogProvider };