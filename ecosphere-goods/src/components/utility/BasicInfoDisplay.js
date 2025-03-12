import React from 'react'

const BasicInfoDisplay = ({ infoLabel='', infoData='' }) => {
  return (
    <span className='flex justify-between text-dark-brown items-center'>
        <p className='font-header opacity-90'>{infoLabel}:</p>
        <p>{infoData}</p>
    </span>
  )
}

export default BasicInfoDisplay
