import React, { useEffect, useState } from 'react'
import { fetchOrderByID, fetchOrders } from '../../../utilityFunctions/orderHandling'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../features/userSlice'
import OrderTrackerItem from './OrderTrackerItem'

const OrderTracker = () => {
    const user = useSelector(selectUser)
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const orders = await fetchOrders(user.uid)
                setOrders(orders)
            } catch (error) {
                console.log(error.message)
            }
        }

        fetchOrder()
    }, [])

    console.log('Orders here:', orders)

    return (
        <div className='flex flex-col w-full h-full overflow-hidden'>
            <h1 className='font-header text-dark-brown text-header'>Pending Orders</h1>

            <div className='flex overflow-hidden w-full'>
                {orders.map((order, index) => (
                    <OrderTrackerItem key={index} order={order}/>
                ))}
            </div>
        </div>
    )
}

export default OrderTracker
