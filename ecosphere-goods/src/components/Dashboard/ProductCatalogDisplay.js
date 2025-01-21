import React, { useEffect, useState } from 'react'
import ProductCatalogItem from './ProductCatalogItem'
import { fetchProducts } from '../../utilityFunctions/productHandling'

const ProductCatalogDisplay = () => {
    const [products, setProducts] = useState([])
    
    useEffect(() => {
        const getProducts = async () => {
            const products = await fetchProducts(undefined, undefined, undefined, 'Newest')
            setProducts(products)
        }

        getProducts()
    }, [])

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
