import React from 'react'

const PaginationArrowButton = ({ children, onClick = () => {}, disabled = false }) => {
  return (
    <button 
        className={`flex justify-center items-center w-8 h-8 bg-dark-brown bg-opacity-0 rounded-md ${disabled ? 'bg-opacity-30 bg-gray-500 text-gray-700' : 'hover:bg-opacity-30'} transition-all ease-in-out duration-300`} 
        onClick={onClick} 
        disabled={disabled} 
    >
        { children }
    </button>
  )
}

export default PaginationArrowButton
