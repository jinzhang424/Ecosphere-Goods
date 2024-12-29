import React from 'react'
import BasicSelector from './BasicSelector'

const SortByAndAppliedFilters = () => {
    return (
        <div className='flex justify-between w-full h-12 items-center'>
            <div className='flex'>
                <p className='font-header text-dark-brown'>Applied Filters:</p>
            </div>

            <div className='flex items-center space-x-4 h-4'>
                <p className='font-header text-light-brown'>Sort By:</p>
                <BasicSelector/>
            </div>
        </div>
    )
}

export default SortByAndAppliedFilters
