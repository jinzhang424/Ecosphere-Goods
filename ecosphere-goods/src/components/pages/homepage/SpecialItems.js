import React from 'react'
import ItemSlider from '../../ItemSlider'

const SpecialItems = () => {
    return (
        <div className='bg-off-white'>
            <div className='p-7'>
                <h1 className='text-header font-header'>Trending Items</h1>
                <ItemSlider nextButtonClass="trending-next" prevButtonClass="trending-prev" sortBy='times_sold' />
            </div>
            <div className="border-b-2 border-dark-brown pb-2 w-11/12 mx-auto"></div>
            <br />
            <div className='p-7 mt-2'>
                <h1 className='text-header font-header'>Latest Collection</h1>
                <ItemSlider nextButtonClass="latest-next" prevButtonClass="latest-prev" sortBy='date_created' />
            </div>
        </div>
    )
}

export default SpecialItems
