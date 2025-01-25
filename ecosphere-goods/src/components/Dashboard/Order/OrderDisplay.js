import React from 'react'
import ProductCatalogItem from '../ProductCatalogItem'

const OrderDisplay = ({ order }) => {
  return (
    <div className='bg-light-brown opacity-10 h-72 rounded-3xl p-8'>
      <p className='text-dark-brown'>
        { order.customer_email }
      </p>
    </div>
  )
}

export default OrderDisplay
