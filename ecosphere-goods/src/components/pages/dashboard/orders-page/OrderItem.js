import React from 'react'
import unitToDollarString from '../../../../utility-functions/unitToDollarString'

const OrderItem = ({ product }) => {
    const name = product.name
    const subcategory = product.metadata.itemSubcategory
    const price = unitToDollarString(product.priceData.unit_amount)
    const pStyle = 'text-center text-dark-brown font-header w-36'

    return (
        <div className='h-full w-full flex rounded-xl overflow-hidden items-center border-2 border-dark-brown border-opacity-10'>
            <img 
                src={product.images[0]} 
                alt={name}
                className='h-full aspect-square object-cover object-center'
            />

            <p className={pStyle}>{name}</p>
            <p className={pStyle}>{price}</p>
            <p className={pStyle}>{subcategory}</p>
            <p className={pStyle}>{product.quantity}</p>
        </div> 
    )
}

export default OrderItem
