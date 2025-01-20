import React from 'react'
import MenuItem from '@mui/material/MenuItem';

const ProfileMenuItem = ({ children, onClick, label, color = 'dark-brown' }) => {
  return (
    <MenuItem onClick={onClick} sx={{zIndex: 1}}>
        <div className={`flex items-center space-x-3 w-fit text-${ color }`}>
            { children }
            <p>{label}</p>
        </div>
    </MenuItem>
  )
}

export default ProfileMenuItem
