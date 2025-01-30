import React, { useContext, useEffect } from 'react'
import ProductCatalogItem from './ProductCatalogItem'
import { fetchProducts } from '../../utilityFunctions/productHandling'
import { ProductCatalogContext } from './ProductCatalogContext'

const ProductCatalogDisplay = () => {
    const { products } = useContext(ProductCatalogContext)

    console.log(products)

    return (
        <div className='overflow-y-scroll h-full space-y-4'>
            {Object.entries(products).map(([productId, productData]) => (
                <div key={ productId }>
                    <ProductCatalogItem key={ productId } productData={ productData }/>
                </div>
            ))}
        </div>
    )
}

export default ProductCatalogDisplay
