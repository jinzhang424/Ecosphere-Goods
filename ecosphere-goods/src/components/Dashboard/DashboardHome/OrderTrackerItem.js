import React, { useState } from 'react'
import OrderItem from '../Order/OrderItem'

const OrderTrackerItem = ({ order }) => {
    
    const orderData = order.orderData
    const products = orderData.products

    return (
        <div className='w-full flex-shrink-0'>
            {products.map((product, index) => (
                <div className='h-16 w-full'>
                    <OrderItem product={product} key={index}/>
                </div>
            ))}
        </div>
    )
}

export default OrderTrackerItem
