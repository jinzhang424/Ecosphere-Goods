import React from 'react'
import Item from './Item'

const ProductDisplay = ({ products }) => {


    return (
        <div className='flex flex-wrap overflow-y-scroll h-full'>
            {Object.entries(products).map(([productId, productData]) => (
                <div className='w-80 mb-8 pr-8' key={ productId } >
                    <Item  
                        imageUrl={ productData.images[0] } 
                        price={ productData.prices[0].priceData.unit_amount / 100 } 
                        name={ productData.name }
                    />
                </div>
            ))}
        </div>
    )
}

export default ProductDisplay
