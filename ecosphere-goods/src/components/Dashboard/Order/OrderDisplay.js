import React from 'react'
import OrderItem from './OrderItem'
import { HiShoppingBag } from "react-icons/hi2";
import { FaCircle } from "react-icons/fa";

const OrderDisplay = ({ order }) => {

  console.log(order.id)
  return (
    <div className='bg-light-brown bg-opacity-10 h-fit rounded-3xl p-6'>
      <span className='flex items-center justify-between pb-3 border-b-2 border-dark-brown border-opacity-10'>
        <div className='flex items-center text-lg font-header text-dark-brown'>
          <HiShoppingBag className='w-8 h-8'/>
          <p className='ml-3'>{order.orderID}</p>
        </div>

        <div className='flex items-center space-x-3 p-2 pl-4 pr-4 rounded-full bg-orange-300 bg-opacity-30'>
          <FaCircle className='text-orange-500'/>
          <p className='font-header text-orange-500'>{order.orderData.order_status}</p>
        </div>
      </span>

      <div className='flex flex-col space-y-3 mt-3'>
        {order.orderData.products.map((product, index) => (
          <OrderItem key={index} product={ product }/>
        ))}
      </div>
    </div>
  )
}

export default OrderDisplay
