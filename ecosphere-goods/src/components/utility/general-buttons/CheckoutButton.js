import React from 'react'
import { CircularProgress } from '@mui/material'

const CheckOutButton = ({ label= '', loadCheckout, loading = false }) => {
    return (
        <button 
            className='p-3 pl-6 pr-6 rounded-full bg-dark-brown text-off-white tracking-3px hover:scale-105 transition-transform ease-in-out duration-300'
            onClick={loadCheckout}
        >
            <div className='flex justify-center items-center'>
                <span className={`${loading && 'opacity-0'}`}>{ label }</span>
                <CircularProgress size={18} color='' className={`absolute opacity-0 ${loading && 'opacity-100'}`}/>
            </div>
        </button>
    )
}

export default CheckOutButton
