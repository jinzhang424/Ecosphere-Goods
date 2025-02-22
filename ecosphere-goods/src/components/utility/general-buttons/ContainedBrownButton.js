import React, { useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress';

const ContainedBrownButton = ({ onClick = async () => {}, children, rounded = true, type = '' }) => {
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    await onClick()
    setLoading(false)
  }

  return (
    <button 
      className={`bg-dark-brown border-2 border-dark-brown text-off-white p-3 ${rounded ? 'rounded-full' : 'rounded-lg'} w-full font-header`}
      onClick={handleClick}
      type={type}
    >
      <span className={`${loading ? 'opacity-0' : ''}`}>{children}</span>
      <CircularProgress color='#362D2D' size={24} className={`absolute ${loading ? '' : 'opacity-0'}`} thickness={4}/>
    </button>
  )
}

export default ContainedBrownButton
