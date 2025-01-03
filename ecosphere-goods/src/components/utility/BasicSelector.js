import React, { useState } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelector() {
  const [sortBy, setSortBy] = useState('Newest');

  const handleChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sortBy}
                onChange={handleChange}
                sx={{
                    width:'150px',
                    backgroundColor: 'rgba(54, 45, 45, 0.4)',
                    color: '#362D2D',
                    borderRadius: '20px',
                    height: '40px',
                    '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                    },
                }}
            >
                <MenuItem value="Newest">Newest</MenuItem>
                <MenuItem value="Oldest">Oldest</MenuItem>
                <MenuItem value="Price: Low to High">Price: Low to High</MenuItem>
                <MenuItem value="Price: High to Low">Price: High to Low</MenuItem>
            </Select>
      </FormControl>
    </Box>
  );
}