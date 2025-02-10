import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';

// Changes opacity on hover
const OpacityButton = ({ label, type='', onClick = async () => {}, loading = false, bgColor = 'bg-dark-brown'}) => {

    const handleClick = async (event) => {
        await onClick(event)
    }

    return (
        <button 
            onClick={handleClick} 
            type={type} 
            className={`flex items-center align-middle justify-center text-off-white font-header ${bgColor} p-2 pl-4 pr-4 rounded-lg hover:bg-opacity-85`}
        >
                <CircularProgress color={'#362D2D'} thickness={6} size={18} className={`absolute w-full h-full text-off-white ${loading ? '' : 'opacity-0'}`}/>
                <span className={`opacity ${loading ? 'opacity-0' : ''}`}>{label}</span>
        </button>
    )
}

export default OpacityButton
