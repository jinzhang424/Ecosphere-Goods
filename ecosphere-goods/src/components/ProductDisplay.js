import React, { useState } from 'react'
import ShoppingProductDialog from './ShoppingProductDialog'

const ProductDisplay = ({ products }) => {
    console.log('prodcut display products:', products)
    const [page, setPage] = useState(1)
    const [productsOnpage, setProductsOnPage] = useState(products.slice(0, 9))

    return (
        <div className='flex flex-wrap pt-6 pl-6'>
            {Object.entries(productsOnpage).map(([productId, productData]) => (
                <div className='w-80 mb-8 pr-8' key={ productId } >
                    <ShoppingProductDialog productData={productData}/>
                </div>
            ))}
        </div>
    )
}

export default ProductDisplay
