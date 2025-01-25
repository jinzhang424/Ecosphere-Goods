import React from 'react'
import ProductCatalogItem from '../ProductCatalogItem'

const OrderItems = ({ order }) => {
  return (
    <div className='bg-light-brown opacity-10 h-72 rounded-3xl p-8'>
      <p className='text-dark-brown'>
        {order.orders[0]?.orderData.products[0].product.name}
      </p>
    </div>
  )
}

export default OrderItems
