import React, { useEffect, useState } from 'react'

const PaginationNumberButtons = ({ totalPages = 1, page = 1, setPage = () => {} }) => {

    return (
        <div className='flex items-center w-1/3 overflow-x-hidden overflow-y-visible pl-1 pr-1'>
            <div className='flex gap-3'>
                {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setPage(index + 1)}
                        className={`
                            flex flex-shrink-0  w-8 justify-center items-center bg-dark-brown bg-opacity-0 rounded-md font-header text-subtitle text-center transition-all ease-in-out duration-300
                            ${page === index + 1 ? 'bg-opacity-30' : 'hover:bg-opacity-30'}
                        `}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>            
    )
}

export default PaginationNumberButtons
