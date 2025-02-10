import React, { useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ProductCatalogContext } from '../ProductCatalogContext';
import db, { collection, getDocs } from '../../../../../firebase'

const SelectSubcategory = ({ className }) => {
    const [subcategories, setSubcategories] = useState([])
    const { category, subcategory, setSubcategory } = useContext(ProductCatalogContext)
    const [error, setError] = useState(false)
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        const fetchSubcategories = (async () => {
            if (!category) {
                return
            }
            
            setError(false)
            try {
                const categoriesRef = collection(db, 'product_categories')
                const subcategoriesSnapShot = await getDocs(categoriesRef)

                subcategoriesSnapShot.docs.forEach(doc => {
                    if (doc.id === category) {
                        setSubcategories(doc.data().subcategories)
                        return;
                    }
                })
            } catch (error) {
                console.error(error)
            }
        })

        fetchSubcategories();
    }, [category])

    const handleSelectorClick = () => {
        if (category) {
            setIsFocused(!isFocused);
        } else {
            setError(true)
        }
    }

    const handleChange = (event) => {
        setSubcategory(event.target.value);
    };

    return (
        <div className={className}>
            <Box className={`${error ? 'animate-shake' : ''}`}>
                <FormControl fullWidth>
                    <InputLabel id="subcategory-label" sx={error ? { color: 'red', '&.Mui-focused': { color: 'red' } } : {}}>Subcategory</InputLabel>
                    <Select
                        labelId="subcategory-label"
                        id="subcategory-select"
                        value={subcategory}
                        label="Subcategory"
                        onChange={handleChange}
                        onClick={(event) => {
                            handleSelectorClick(event);
                        }}
                        error={error}
                        open={!error && isFocused}
                        required
                    >
                        {subcategories.map((subcategory, index) => (
                            <MenuItem key={ index } value={ subcategory }>{ subcategory }</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            {error ? <p className='text-base text-red-700 absolute pt-1'>Please select a category first</p> : ''}
        </div>
    )
}

export default SelectSubcategory
