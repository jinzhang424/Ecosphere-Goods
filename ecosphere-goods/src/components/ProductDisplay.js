import React from 'react'
import heroSliderData from '../data/heroSliderData.json'
import Item from './Item'

const ProductDisplay = () => {
    return (
        <div className='flex flex-wrap overflow-y-scroll justify-between h-full'>
            {heroSliderData.map((item, index) => (
                <div className='w-80 mb-8 pr-8'>
                    <Item 
                        key={ index } 
                        imageUrl={ item.url } 
                        price='69' 
                        name='Lorem Ipsum'
                    />
                </div>
            ))}
        </div>
    )
}

export default ProductDisplay
