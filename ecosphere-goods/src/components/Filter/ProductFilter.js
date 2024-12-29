import React, { useState } from 'react'
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FilterCategory from './FilterCategory';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const ProductFilter = () => {
    const [openCategories, setOpenCategories] = useState(true);

    const handleCategoriesClick = () => {
        setOpenCategories(!openCategories);
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

            <Collapse 
                in={openCategories} 
                timeout="auto" 
                sx={{ 
                    width: '95%', 
                }}
            >
                {/* Kitchenware */}
                <FilterCategory categoryName='Kitchenware'>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox />} label="Utensils" />
                        <FormControlLabel control={<Checkbox />} label="Cutting Boards" />
                        <FormControlLabel control={<Checkbox />} label="Knives" />
                    </FormGroup>
                </FilterCategory>
                
                {/* Furniture */}
                <FilterCategory categoryName='Furniture'>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox />} label="Utensils" />
                        <FormControlLabel control={<Checkbox />} label="Cutting Boards" />
                        <FormControlLabel control={<Checkbox />} label="Knives" />
                    </FormGroup>
                </FilterCategory>

                {/* Decor */}
                <FilterCategory categoryName='Decor'>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox />} label="Utensils" />
                        <FormControlLabel control={<Checkbox />} label="Cutting Boards" />
                        <FormControlLabel control={<Checkbox />} label="Knives" />
                    </FormGroup>
                </FilterCategory>
            </Collapse>
        </div>
    )
}

export default ProductFilter
