import React from 'react'
import { FaAngleRight } from "react-icons/fa6";
import OrderHeading from '../Order/OrderHeading'
import OrderStatus from '../Order/OrderStatus'
import { Link } from 'react-router-dom';

const RecentOrderItem = ({ order }) => {
    
    const orderData = order.orderData
    const products = orderData.products.slice(0, 5)
    const date = new Date(orderData.created._nanoseconds / 100000 + orderData.created._seconds * 1000)
    const dateString = date.toLocaleDateString()

    return (
        <div className='flex flex-col space-y-3 w-full flex-shrink-0 border-2 border-dark-brown border-opacity-20 p-6 rounded-2xl'>
            <div className='flex justify-between'>
                <OrderHeading orderID={order.orderID}/>
                <OrderStatus orderStatus={orderData.order_status}/>
            </div>
            
            <div className='flex space-x-2'>
                {products.map((product, index) => (
                    <img src={product.images[0]} className='h-16 w-16 aspect-square object-center object-cover rounded-xl' />
                ))}

                {(products.length > 5) && <div>...</div>}
            </div>

            <span className='flex w-full justify-between items-center text-dark-brown'>
                <div className='font-header'>
                    <p className='opacity-50 text-sm'>Date Ordered</p>
                    <p>{dateString}</p>
                </div>

                <Link to={`/dashboard/orders/${order.customer_id}/${order.orderID}`} className='group flex justify-end w-1/6 opacity-90'>
                    <FaAngleRight className='w-full h-6 group-hover:translate-x-2 transition-transform ease-in-out duration-300'/>
                </Link>
            </span>
        </div>
    )
}

export default RecentOrderItem
