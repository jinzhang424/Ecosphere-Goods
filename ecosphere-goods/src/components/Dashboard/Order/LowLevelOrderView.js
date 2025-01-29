import React from 'react'
import { fetchOrderByID } from '../../../utilityFunctions/orderHandling'
import { useLoaderData } from 'react-router-dom'
import OrderItem from './OrderItem'
import OrderHeading from './OrderHeading';
import OrderStatus from './OrderStatus';
import BasicInfoDisplay from '../../utility/BasicInfoDisplay';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../features/userSlice';
import unitToDollarString from '../../../utilityFunctions/unitToDollarString';

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
    const user = useSelector(selectUser)
    const orderInfo = useLoaderData()
    const products = orderInfo.orderData.products

    const orderDate = new Date(orderInfo.orderData.created._seconds * 1000 + orderInfo.orderData.created._nanoseconds / 1000000)
    const dateString = orderDate.toLocaleDateString();
    const totalPrice = unitToDollarString(orderInfo?.orderData?.total_price)

    console.log(orderInfo)

    return (
        <div className='w-full h-full bg-off-white rounded-3xl p-8'>
            <span className='flex items-center space-x-4 justify-between border-b-2 pb-4 border-dark-brown border-opacity-15'>
                <OrderHeading orderID={orderInfo.orderID}/>
                <OrderStatus orderStatus={orderInfo.orderData.order_status}/>
            </span>

            <div className='flex space-x-4 mt-6 '>
                <div className='h-full flex flex-col flex-grow space-y-4 overflow-auto'>
                    {products.map((product, index) => (
                        <div className='h-24 flex flex-col'>
                            <OrderItem product={ product } key={ index }/>
                        </div>
                    ))}
                </div>

                <article className='text-dark-brown border-2 rounded-xl font-header h-fit w-4/12 border-dark-brown border-opacity-10 p-4 space-y-3'>
                    <h2 className='text-subtitle'>Order Details</h2>
                    
                    <div className='flex flex-col font-header space-y-2 ml-2'>
                        <BasicInfoDisplay infoLabel='Date Ordered' infoData={dateString}/>
                        <BasicInfoDisplay infoLabel='Delivery Address' infoData={user?.deliveryInfo?.address}/>
                        <BasicInfoDisplay infoLabel='Total Price' infoData={totalPrice}/>
                    </div>
                </article>
            </div>
        </div>
    )
}

export default LowLevelOrderView
