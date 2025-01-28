import React from 'react'
import OrderItem from './OrderItem'
import unitToDollarString from '../../../utilityFunctions/unitToDollarString';
import { Link } from 'react-router-dom';
import OrderHeading from './OrderHeading';
import OrderStatus from './OrderStatus';

const OrderDisplay = ({ order }) => {

  const products = order.orderData.products.slice(0, 2)

  return (
    <div className='bg-light-brown bg-opacity-10 h-fit rounded-3xl p-6'>
      <span className='flex items-center justify-between pb-4 border-b-2 border-dark-brown border-opacity-10'>
        <OrderHeading orderID={order.orderID}/>
        <OrderStatus orderStatus={order.orderData.order_status}/>
      </span>

        {products.map((product, index) => (
          <span className='flex h-24 flex-col space-y-3 mt-4'>
            <OrderItem key={index} product={ product }/>
          </span>
        ))}
      
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
