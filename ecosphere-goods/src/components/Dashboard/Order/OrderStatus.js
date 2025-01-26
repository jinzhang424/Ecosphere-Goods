import React from 'react'
import { FaCircle } from "react-icons/fa";

const OrderStatus = ({ orderStatus }) => {
  return (
    <div className='flex items-center space-x-3 p-2 pl-4 pr-4 rounded-full bg-orange-300 bg-opacity-30'>
        <FaCircle className='text-orange-500'/>
        <p className='font-header text-orange-500'>{orderStatus}</p>
    </div>
  )
}

export default OrderStatus
