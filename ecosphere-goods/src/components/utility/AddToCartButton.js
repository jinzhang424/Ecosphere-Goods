import React, { useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress';

const AddToCartButton = ({ onClick = async () => {}, children }) => {
    const [loading, setLoading] = useState(false)

    const handleClick = async () => {
        setLoading(true);
        await onClick();
        setLoading(false);
    }

  return (
    <button 
        className='relative bg-light-brown p-2 pl-4 pr-4 rounded-xl font-header text-dark-brown bg-opacity-50 flex items-center justify-center hover:scale-105 transition-transform ease-in-out duration-300'
        onClick={ handleClick }
        disabled={loading}
    >
        {loading && (
            <CircularProgress size={20} className="absolute" color='#E9E1DE'/>
        )}
        <span className={`${loading ? 'opacity-0' : 'opacity-100'}`}>{children}</span>
    </button>
  )
}

export default AddToCartButton
