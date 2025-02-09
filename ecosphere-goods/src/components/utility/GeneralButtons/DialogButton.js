import React from 'react'
import { CircularProgress } from '@mui/material'

const DialogButton = ({ label='', onClick = () => {}, type='', loading=false }) => {
  return (
    <button onClick={onClick} className='bg-dark-brown p-2 pl-4 pr-4 rounded-full border-2 bg-opacity-0 border-dark-brown hover:bg-opacity-100 hover:text-off-white transition-all ease-in-out duration-300' type='submit'>
      <div className='flex justify-center items-center'>
        <span className={`${loading ? 'opacity-0' : ''}`}>{label}</span>
        <CircularProgress color='' size={24} className={`absolute ${loading ? '' : 'opacity-0'}`}/>
      </div>
    </button>
  )
}

export default DialogButton
