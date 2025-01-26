import React from 'react'
import OrderItem from './OrderItem'
import { HiShoppingBag } from "react-icons/hi2";
import { FaCircle } from "react-icons/fa";
import unitToDollarString from '../../../utilityFunctions/unitToDollarString';
import { Link } from 'react-router-dom';

const OrderDisplay = ({ order }) => {

  console.log(order.customer_id)
  return (
    <div className='bg-light-brown bg-opacity-15 h-fit rounded-3xl p-6'>
      <span className='flex items-center justify-between pb-4 border-b-2 border-dark-brown border-opacity-10'>
        <div className='flex items-center text-lg font-header text-dark-brown'>
          <HiShoppingBag className='w-8 h-8'/>
          <p className='ml-3'>{order.orderID}</p>
        </div>

        <div className='flex items-center space-x-3 p-2 pl-4 pr-4 rounded-full bg-orange-300 bg-opacity-30'>
          <FaCircle className='text-orange-500'/>
          <p className='font-header text-orange-500'>{order.orderData.order_status}</p>
        </div>
      </span>

      <span className='flex flex-col space-y-3 mt-4'>
        {order.orderData.products.map((product, index) => (
          <OrderItem key={index} product={ product }/>
        ))}
      </span>
      
      <span className='flex mt-6 justify-between items-center pt-4 border-t-2 border-dark-brown border-opacity-10'>
        <p className='font-header text-dark-brown'>Total: {unitToDollarString(order.orderData.total_price)}</p>
        <Link 
          className='font-header p-2 pl-5 pr-5 bg-dark-brown bg-opacity-0 text-dark-brown rounded-full border-2 border-dark-brown hover:bg-opacity-100 hover:text-off-white transition-all ease-in-out duration-300'
          to={`${order.customer_id}/${order.orderID}`}
        >
            View Order
        </Link>
      </span>
    </div>
  )
}

export default OrderDisplay
