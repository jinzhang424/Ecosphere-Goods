import React from 'react'

const DialogButton = ({ label, onClick, type='' }) => {
  return (
    <button 
            className='bg-dark-brown rounded-lg text-off-white h-fit p-2 pl-3 pr-3 font-header tracking-wide hover:bg-opacity-85 transition-all ease-in-out duration-100'
            onClick={ onClick }
            type={ type }
        >
        { label }
    </button>
  )
}

export default DialogButton
