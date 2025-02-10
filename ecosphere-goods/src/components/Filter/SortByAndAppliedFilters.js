import React from 'react'
import OrderBySelector from './OrderBySelector'

const SortByAndAppliedFilters = ({ filters, setSortByVal }) => {
    return (
        <div className='flex justify-between w-full h-12 items-center'>
            <div className='flex items-center'>
                <p className='font-header text-dark-brown'>Applied Filters:</p>
                {filters.map((filter, index) => (
                    <div key={index} className='ml-2 p-3 pb-2 pt-2 rounded-lg bg-light-brown bg-opacity-20 font-header text-dark-brown'>
                        { filter }
                    </div>
                ))}
            </div>

            <div className='flex items-center space-x-4 h-4'>
                <p className='font-header text-light-brown'>Sort By:</p>
                <OrderBySelector setSortByVal={ setSortByVal }/>
            </div>
        </div>
    )
}

export default SortByAndAppliedFilters
