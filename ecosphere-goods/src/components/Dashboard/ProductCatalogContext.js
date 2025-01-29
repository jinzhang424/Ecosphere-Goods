import React, { createContext, useState } from 'react';

const ProductCatalogContext = createContext();

const ProductCatalogProvider = ({ children }) => {
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const [image, setImage] = useState(null)
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')

    return (
        <ProductCatalogContext.Provider 
            value={{ 
                category, setCategory, 
                subcategory, setSubcategory, 
                image, setImage, 
                name, setName, 
                price, setPrice 
            }}
        >
            {children}
        </ProductCatalogContext.Provider>
    );
};

export { ProductCatalogContext, ProductCatalogProvider };