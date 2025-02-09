import React from 'react'

const PaginationNumberButtons = ({ totalPages = 1, page = 1, setPage = () => {} }) => {
    const buttonWidth = 32;
    const buttonSpacing = 12;
    const visibleButtons = totalPages < 7 ? totalPages : 7;

    const containerWidth = visibleButtons * buttonWidth + visibleButtons * buttonSpacing;

    let translateX = 0
    if (page > totalPages - 7) {
        translateX = (totalPages - 7) * (buttonWidth + buttonSpacing)
    } else {
        translateX = (page - 1) * (buttonWidth + buttonSpacing)
    }

    return (
        <div className='flex items-center pl-2 overflow-hidden' style={{ width: `${containerWidth}px`}}>
            <div 
                className='flex gap-3 transition-transform ease-in-out duration-300'
                style={{ transform: `translateX(-${translateX}px)`}}
            >
                {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setPage(index + 1)}
                        className={`
                            flex flex-shrink-0 w-8 justify-center items-center bg-dark-brown bg-opacity-0 rounded-md font-header text-subtitle text-center transition-all ease-in-out duration-300
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
