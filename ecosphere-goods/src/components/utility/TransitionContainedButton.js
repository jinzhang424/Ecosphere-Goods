import React from 'react'

const TransitionContainedButton = ({ label='', onClick, type='' }) => {
  return (
    <button onClick={onClick} className='bg-dark-brown p-2 pl-4 pr-4 rounded-full border-2 bg-opacity-0 border-dark-brown hover:bg-opacity-100 hover:text-off-white transition-all ease-in-out duration-500' type='submit'>{label}</button>
  )
}

export default TransitionContainedButton
