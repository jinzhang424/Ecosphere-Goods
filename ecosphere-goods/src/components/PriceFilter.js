import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

function valuetext(value) {
    return `${value}$`;
}

const CustomSlider = styled(Slider)({
    '& .MuiSlider-valueLabel': {
        position: 'relative',
        top: '60px',
        background: 'rgba(54, 45, 45, 0.3)',
        color: '#362D2D',
        borderRadius: '8px'
    },
    '& .MuiSlider-valueLabel > span': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: '700',
    },
    '& .MuiSlider-valueLabel::before': {
        display: 'none'
    }
});

const PriceFilter = () => {
    const [value, setValue] = useState([0, 300]);
    const [openSlider, setOpenSlider] = useState(true);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handlePricesClick = () => {
        setOpenSlider(!openSlider)
    }

    return (
        <div className={`flex flex-col items-center ${openSlider ? 'space-y-8 pb-8' : ''}`}>
            <ListItemButton 
                onClick={ handlePricesClick } 
                sx={{ 
                    backgroundColor: 'rgba(54, 45, 45, 0.25)',
                    borderRadius: '16px',
                    '&:hover': {
                        backgroundColor: 'rgba(54, 45, 45, 0.4)',
                    },
                    color: "rgb(54, 45, 45)",
                    width: "100%",
                }}
            >
                <ListItemText 
                    primary="Price Range" 
                    primaryTypographyProps={{ fontWeight: 'bold' }}
                />
                {openSlider ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={ openSlider } timeout="auto">
                <Box sx={{ width: 200 }}>
                    <CustomSlider 
                        getAriaLabel={() => 'Price range'}
                        value={value}
                        onChange={handleChange}
                        valueLabelDisplay="on"
                        valueLabelFormat={valuetext}
                        sx={{ color: '#362D2D' }}
                        max={300}
                    />
                </Box>
            </Collapse>
        </div>
    );
}

export default PriceFilter;