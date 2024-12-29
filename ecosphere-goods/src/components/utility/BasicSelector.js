import React, { useState } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelector() {
  const [sortBy, setSortBy] = useState('Date Added');

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
                <MenuItem value={10}>Trending</MenuItem>
                <MenuItem value={20}>Date Added</MenuItem>
                <MenuItem value={30}>Price</MenuItem>
            </Select>
      </FormControl>
    </Box>
  );
}