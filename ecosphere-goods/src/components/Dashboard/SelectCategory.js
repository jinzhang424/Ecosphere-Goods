import React, { useEffect, useContext, useState } from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import db, { collection, getDocs } from '../../firebase';
import { NewItemContext } from './NewItemContext';

const SelectCategory = ({ className = ''}) => {
    const { category, setCategory } = useContext(NewItemContext);
    const [categories, setCategories] = useState([])


    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    useEffect(() => {
        const fetchCategories = (async () => {
            try {
                const categoriesRef = collection(db, 'product_categories');
                const categoriesSnapShot = await getDocs(categoriesRef);
                const categoriesList = categoriesSnapShot.docs.map(doc => doc.id);
                setCategories(categoriesList);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        })

        fetchCategories()
    }, [])

    return (
        <div className={ className }>
            <Box sx={{ width: '100%' }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="category-selector"
                    value={ category }
                    label="Category"
                    onChange={handleChange}
                    >
                        {categories.map((category, index) => (
                            <MenuItem key={ index } value={ category }>{ category }</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        </div>
    )
}

export default SelectCategory
