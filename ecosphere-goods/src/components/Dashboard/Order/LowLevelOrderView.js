import React from 'react'
import { fetchOrderByID } from '../../../utilityFunctions/orderHandling'
import { useLoaderData } from 'react-router-dom'
import OrderItem from './OrderItem'
import OrderHeading from './OrderHeading';
import OrderStatus from './OrderStatus';

export const orderLoader = async ({ params }) => {
    const { userID, orderID } = params

    let order
    try {
        order = await fetchOrderByID(orderID, userID)
    } catch (error) {
        console.log(error.message)
    }

    return order
}

const LowLevelOrderView = () => {
    const orderInfo = useLoaderData()
    console.log('ORDERINFO: ', orderInfo)
    const products = orderInfo.orderData.products

    return (
        <div className='w-full h-full bg-off-white rounded-3xl p-8'>
            <h1 className='flex items-center space-x-4 justify-between'>
                <OrderHeading orderID={orderInfo.orderID}/>
                <OrderStatus orderStatus={orderInfo.orderData.order_status}/>
            </h1>

            <div className='flex space-x-4 mt-8 '>
                <div className='flex flex-col flex-grow space-y-4 overflow-auto'>
                    {products.map((product, index) => (
                        <OrderItem product={ product } key={ index }/>
                    ))}
                </div>

                <article className='text-dark-brown border-2 rounded-xl font-header w-4/12 border-dark-brown border-opacity-10 p-4 space-y-3'>
                    <h2 className='text-subtitle'>Order Details</h2>
                    
                    <body className='flex flex-col font-header space-y-2 ml-2 opacity-90'>
                        <span>Date Ordered: </span>
                        <span>Address: </span>
                        <span>Item Qty: </span>
                        <span>Total Price: </span>
                    </body>
                </article>
            </div>
        </div>
    )
}

export default LowLevelOrderView
