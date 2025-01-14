import React, { useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { NewItemContext } from './NewItemContext';
import db, { collection, getDocs } from '../../firebase'

const SelectSubcategory = () => {
    const [subcategories, setSubcategories] = useState([])
    const [subcategory, setSubcategory] = useState([])
    const { category } = useContext(NewItemContext)

    const handleChange = (event) => {
        setSubcategory(event.target.value);
    };

    useEffect(() => {
        const fetchSubcategories = (async () => {
            if (category) {
                const categoriesRef = collection(db, 'product_categories')
                const subcategoriesSnapShot = await getDocs(categoriesRef)

                subcategoriesSnapShot.docs.map(doc => {
                    if (doc.id === category) {
                        setSubcategories(doc.data().subcategories)
                    }
                })
            }
        })

        fetchSubcategories();
    }, [category])

    console.log('Subcategories: ', subcategories)

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Subcategory</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={subcategory}
                label="Subcategory"
                onChange={handleChange}
                >
                    {subcategories.map((subcategory, index) => (
                        <MenuItem key={ index } value={ subcategory }>{ subcategory }</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    )
}

export default SelectSubcategory
