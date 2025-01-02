import React, { useState } from 'react'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const KitchenwareFilters = ({ children, categoryName }) => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <div>
            <ListItemButton 
                onClick={handleClick}
                sx={{ 
                    borderRadius: '16px',
                    '&:hover': {
                        backgroundColor: 'rgba(54, 45, 45, 0.1)',
                    },
                }}
            >
                <ListItemText primary={ categoryName } />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit className="ml-6 pl-4 border-dark-brown border-l-2 border-opacity-50">
                <List component="div" disablePadding>
                    { children }
                </List>
            </Collapse>
        </div>
    )
}

export default KitchenwareFilters
