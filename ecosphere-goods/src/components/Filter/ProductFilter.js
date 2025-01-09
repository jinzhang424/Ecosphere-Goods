import React, { useEffect, useState } from 'react'
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FilterCategory from './FilterCategory';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import db, { collection, getDocs, query } from '../../firebase';

const ProductFilter = ({ setFilters }) => {
    const [openCategories, setOpenCategories] = useState(true);
    const [selectedFilters, setSelectedFilters] = useState(new Set())
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoryCollection = collection(db, 'product_categories');
                const categorySnapshot = await getDocs(categoryCollection);
                const categoryList = categorySnapshot.docs.map(doc => ({
                    name: doc.id,
                    subcategories: doc.data().subcategories || []
                }));
                setCategories(categoryList);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setCategories([])
            }
        }

        fetchCategories();
    }, []);

    const handleCategoriesClick = () => {
        setOpenCategories(!openCategories);
    }

    const handleSelectFilter = (e) => {
        const { name, checked } = e.target;
        setSelectedFilters((prevFilters) => {
            const newFilters = new Set(prevFilters);
            if (checked) {
                newFilters.add(name);
            } else {
                newFilters.delete(name);
            }
            
            setFilters(Array.from(newFilters))
            return newFilters
        })
    }
  
    return (
        <div className={`h-auto ${openCategories ? 'pb-4 border-dark-brown border-opacity-50 mb-6 border-b-2' : ''} transition-transform ease-in-out pb-8`}>
            <ListItemButton 
                onClick={handleCategoriesClick} 
                sx={{ 
                    backgroundColor: 'rgba(54, 45, 45, 0.25)',
                    borderRadius: '16px',
                    '&:hover': {
                        backgroundColor: 'rgba(54, 45, 45, 0.4)',
                    },
                    color: "rgb(54, 45, 45)",
                }}
            >
                <ListItemText 
                    primary="Category" 
                    primaryTypographyProps={{ fontWeight: 'bold' }}
                />
                {openCategories ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={openCategories}>
                {categories.length > 0 && (
                    categories.map((category, index) => (
                        <FilterCategory key={index} categoryName={category.name}>
                            <FormGroup>
                                {category.subcategories.map((subcategory, subIndex) => (
                                    <FormControlLabel
                                        key={subIndex}
                                        control={
                                            <Checkbox
                                                checked={selectedFilters.has(subcategory)}
                                                onChange={handleSelectFilter}
                                                name={subcategory}
                                            />
                                        }
                                        label={subcategory}
                                    />
                                ))}
                            </FormGroup>
                        </FilterCategory>
                    ))
                )}
            </Collapse>
        </div>
    )
}

export default ProductFilter
