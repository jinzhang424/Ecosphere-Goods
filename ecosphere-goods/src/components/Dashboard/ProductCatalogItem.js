import React from 'react'
import unitToDollarString from '../../utilityFunctions/unitToDollarString'

const ProductCatalogItem = (productData) => {
    const productImgUrl = productData.productData.images[0]
    const productName = productData.productData.name
    const productUnitAmount = productData.productData.prices[0].priceData.unit_amount
    const productCategory = productData.productData.stripe_metadata_itemCategory

    return (
        <span className='flex justify-between text-dark-brown font-header h-24'>
            <img 
                src={ productImgUrl } 
                className='aspect-square object-cover' 
            />
            
            <p>{ productName }</p>
            <p>{ productCategory }</p>
            <p>{ unitToDollarString(productUnitAmount) }</p>
        </span>
    )
}

export default ProductCatalogItem
