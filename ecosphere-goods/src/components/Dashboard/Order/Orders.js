import React from 'react'
import OrderItems from './OrderItems'

const Orders = () => {
  return (
    <div className='bg-off-white rounded-3xl w-full h-full p-8  '>
      <h1 className='font-header text-header text-dark-brown'>Orders</h1>
      <OrderItems/>
    </div>
  )
}

export default Orders
