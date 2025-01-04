import React from 'react'
import BasicSelector from '../utility/BasicSelector'

const SortByAndAppliedFilters = ({ filters, setSortByVal }) => {
    return (
        <div className='flex justify-between w-full h-12 items-center'>
            <div className='flex'>
                <p className='font-header text-dark-brown'>Applied Filters:</p>
                {filters.map((filter, index) => (
                    <div key={index}>
                        { filter }
                    </div>
                ))}
            </div>

            <div className='flex items-center space-x-4 h-4'>
                <p className='font-header text-light-brown'>Sort By:</p>
                <BasicSelector setSortByVal={ setSortByVal }/>
            </div>
        </div>
    )
}

export default SortByAndAppliedFilters
