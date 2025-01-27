import React from 'react'
import { FaCircle } from "react-icons/fa";

const OrderStatus = ({ orderStatus }) => {
  const isPending = orderStatus === 'Pending'

  return (
    <div className='flex items-center space-x-3 p-2 pl-4 pr-4 rounded-full bg-orange-300 bg-opacity-30'>
        <FaCircle className={`${isPending ? 'text-orange-500' : 'text-red-600'}`}/>
        <p className={`font-header ${isPending ? 'text-orange-500' : 'text-red-600'}`}>{orderStatus}</p>
    </div>
  )
}

export default OrderStatus
