import React from 'react'

const PaginationNumberButtons = ({ totalPages = 1, page = 1, setPage = () => {} }) => {
  return (
        <>
            {Array.from({ length: totalPages }).map((_, index) => (
                <button
                    key={index}
                    onClick={() => setPage(index + 1)}
                    className={`flex justify-center items-center bg-dark-brown bg-opacity-0 rounded-md aspect-square font-header text-subtitle text-center max-h-8 max-w-8 w-full h-full ${page === index + 1 ? 'bg-opacity-30 scale-110' : 'hover:bg-opacity-30 hover:scale-110'} transition-all ease-in-out duration-300`}
                >
                    {index + 1}
                </button>
            ))}
        </>            
    )
}

export default PaginationNumberButtons
