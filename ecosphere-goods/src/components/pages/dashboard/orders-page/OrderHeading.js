import React from 'react'
import { HiShoppingBag } from "react-icons/hi2";

const OrderHeading = ({ orderID }) => {
  return (
    <div className='flex items-center text-lg font-header text-dark-brown'>
        <HiShoppingBag className='w-8 h-8'/>
        <p className='ml-3'>{orderID}</p>
    </div>
  )
}

export default OrderHeading
