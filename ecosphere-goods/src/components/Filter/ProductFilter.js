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

const ProductFilter = ({ setFilters }) => {
    const [openCategories, setOpenCategories] = useState(true);
    const [selectedFilters, setSelectedFilters] = useState(new Set())

    const handleCategoriesClick = () => {
        setOpenCategories(!openCategories);
    }

    const handleSelectFilter = (e) => {
        const { id, checked } = e.target;
        setSelectedFilters((prevFilters) => {
            const newFilters = new Set(prevFilters);
            if (checked) {
                newFilters.add(id);
            } else {
                newFilters.delete(id);
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
                        <FormControlLabel control={<Checkbox id='Utensils' label="Utensils"/>} label="Utensils" onChange={ handleSelectFilter }/>
                        <FormControlLabel control={<Checkbox id='Cutting Boards'/>} label="Cutting Boards" onChange={ handleSelectFilter }/>
                        <FormControlLabel control={<Checkbox id='Knives'/>} label="Knives" onChange={ handleSelectFilter }/>
                    </FormGroup>
                </FilterCategory>
                
                {/* Furniture */}
                <FilterCategory categoryName='Furniture'>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox id='Tables'/>} label="Tables" onChange={ handleSelectFilter }/>
                        <FormControlLabel control={<Checkbox id='Chairs'/>} label="Chairs" onChange={ handleSelectFilter }/>
                        <FormControlLabel control={<Checkbox id='Couches'/>} label="Couches" onChange={ handleSelectFilter }/>
                    </FormGroup>
                </FilterCategory>

                {/* Decor */}
                <FilterCategory categoryName='Decor'>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox id='House Plants'/>} label="House Plants" onChange={ handleSelectFilter }/>
                        <FormControlLabel control={<Checkbox id='Lights'/>} label="Lights" onChange={ handleSelectFilter }/>
                        <FormControlLabel control={<Checkbox id='Paintings'/>} label="Paintings" onChange={ handleSelectFilter }/>
                    </FormGroup>
                </FilterCategory>
            </Collapse>
        </div>
    )
}

export default ProductFilter
