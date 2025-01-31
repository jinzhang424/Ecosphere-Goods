import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';

const UncontainedButton = ({ label = '', onClick = () => {}, loading = false, bgColor='dark-brown', color='dark-brown', transitionColor='off-white' }) => {

    return (
        <button 
            className={`border-3 font-header border-${color} text-${color} bg-${bgColor} bg-opacity-0 hover:bg-opacity-100 p-3 w-full hover:text-${transitionColor} transition ease-in-out duration-300 rounded-full`}
            onClick={ onClick }

        >
            <div className='flex justify-center h-full items-center'>
                <span className={`${loading ? 'opacity-0' : ''}`}>{label}</span>
                <CircularProgress color='#362D2D' size={24} className={`absolute ${loading ? '' : 'opacity-0'}`} thickness={4}/>
            </div>
        </button>
    )
}

export default UncontainedButton
