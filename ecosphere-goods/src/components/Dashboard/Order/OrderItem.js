import React from 'react'
import unitToDollarString from '../../../utilityFunctions/unitToDollarString'

const OrderItem = ({ product }) => {
    const productData = product.product
    const name = productData.name
    const subcategory = productData.metadata.itemSubcategory
    const price = unitToDollarString(productData.prices[0].priceData.unit_amount)
    const pStyle = 'text-center text-dark-brown font-header w-36'

    return (
        <div className='flex rounded-xl overflow-hidden items-center space-x-4 border-2 border-dark-brown border-opacity-10'>
            <img src={productData.images[0]} className='w-24 aspect-square object-cover object-center'/>

            <p className={pStyle}>{name}</p>
            <p className={pStyle}>{price}</p>
            <p className={pStyle}>{subcategory}</p>
            <p className={pStyle}>{product.quantity}</p>
        </div> 
    )
}

export default OrderItem
