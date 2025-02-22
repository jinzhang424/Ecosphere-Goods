import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';

const ContainedBrownButton = ({ onClick = async () => {}, children, loading = false, rounded = true, type = '' }) => {

  return (
    <button 
      className={`flex justify-center items-centers bg-dark-brown border-2 border-dark-brown text-off-white p-3 ${rounded ? 'rounded-full' : 'rounded-lg'} w-full font-header`}
      onClick={() => onClick()}
      type={type}
    >
      <span className={`${loading ? 'opacity-0' : ''}`}>{children}</span>
      <CircularProgress color='#362D2D' size={24} className={`absolute ${loading ? '' : 'opacity-0'}`} thickness={4}/>
    </button>
  )
}

export default ContainedBrownButton
