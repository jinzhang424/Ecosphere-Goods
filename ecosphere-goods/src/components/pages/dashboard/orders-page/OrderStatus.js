import React from 'react'
import { FaCircle } from "react-icons/fa";

const OrderStatus = ({ orderStatus, children }) => {
  let orderStatusColor;

  switch(orderStatus) {
    case 'Cancelled':
      orderStatusColor = 'bg-red-500 text-red-600 outline-red-500';
      break;
    case 'Pending':
      orderStatusColor = 'bg-orange-400 text-orange-600 outline-orange-500';
      break;
    case 'Delivered':
      orderStatusColor = 'bg-green-400 text-green-700 outline-green-600';
      break;
    default:
      orderStatusColor = 'bg-dark-brown text-off-white outline-dark-brown';
      break;
  }

  return (
    <div className={`flex items-center space-x-3 p-2 pl-4 pr-4 rounded-full bg-opacity-30 w-full ${orderStatusColor} hover:outline`}>
      <FaCircle size={12}/>
      <p className='font-header'>{orderStatus}</p>
      <div>{children}</div>
    </div>
  )
}

export default OrderStatus