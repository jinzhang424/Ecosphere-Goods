import React, { createContext, useState } from 'react';

const NewItemContext = createContext();

const NewItemProvider = ({ children }) => {
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState([]);
    const [image, setImage] = useState(null)
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')

    return (
        <NewItemContext.Provider 
            value={{ 
                category, setCategory, 
                subCategory, setSubcategory, 
                image, setImage, 
                name, setName, 
                price, setPrice 
            }}
        >
            {children}
        </NewItemContext.Provider>
    );
};

export { NewItemContext, NewItemProvider };