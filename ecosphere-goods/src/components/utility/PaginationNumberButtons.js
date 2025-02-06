import React from 'react'

const PaginationNumberButtons = ({ totalPages = 1, page = 1, onClick = () => {}, index = 1 }) => {
  return (
        <button
            key={index}
            onClick={onClick}
            className={`bg-dark-brown bg-opacity-30 rounded-md aspect-square font-header text-subtitle text-center max-h-8 max-w-8 w-full h-full ${page === index + 1 ? 'scale-110' : 'hover:scale-110 transition-transform ease-in-out duration-300'}`}
        >
            {index + 1}
        </button>
    )
}

export default PaginationNumberButtons
