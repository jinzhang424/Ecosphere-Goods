import React from 'react'
import ShoppingProductDialog from './ShoppingProductDialog'

const ProductDisplay = ({ products }) => {
    console.log('prodcut display products:', products)

    return (
        <div className='flex flex-wrap overflow-y-scroll h-full pt-6 pl-6'>
            {Object.entries(products).map(([productId, productData]) => (
                <div className='w-80 mb-8 pr-8' key={ productId } >
                    <ShoppingProductDialog productData={productData}/>
                </div>
            ))}
        </div>
    )
}

export default ProductDisplay
