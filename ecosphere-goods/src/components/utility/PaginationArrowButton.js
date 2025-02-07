import React from 'react'

const PaginationArrowButton = ({ children, onClick = () => {}, disabled = false }) => {
  return (
    <button 
        className={`bg-dark-brown bg-opacity-0 p-2 rounded-md ${disabled ? 'bg-gray-500 text-gray-700' : 'hover:bg-opacity-30 transition-all ease-in-out duration-300'}`} 
        onClick={onClick} 
        disabled={disabled} 
    >
        { children }
    </button>
  )
}

export default PaginationArrowButton
