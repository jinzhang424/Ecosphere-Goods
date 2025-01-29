import React, { createContext, useState } from 'react';
import { addNewProduct, updateProduct } from '../../utilityFunctions/productHandling';
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

    const handleAddProduct = async () => {
        try {
          const storageRef = ref(storage, `images/${Date.now()}`);
          await uploadString(storageRef, image, 'data_url');
          const imageUrl = await getDownloadURL(storageRef);
    
          await addNewProduct(name, price, subcategory, imageUrl, category, user.uid)
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

            toast.success('Successfully deleted product.')
        } catch (error) {
            console.error(error.message);
            toast.error('Failed to delete product.')
        }
    };

    return (
        <ProductCatalogContext.Provider 
            value={{ 
                category, setCategory, 
                subcategory, setSubcategory, 
                image, setImage, 
                name, setName, 
                price, setPrice,
                
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