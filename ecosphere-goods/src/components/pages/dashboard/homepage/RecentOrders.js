import React, { useEffect, useState } from 'react'
import { fetchOrders } from '../../../../api/orderHandling'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../../features/userSlice'
import RecentOrderItem from './RecentOrderItem'
import TruckComponentLoader from '../../../animations/TruckComponentLoader'
import { auth } from '../../../../firebase'

const RecentOrders = () => {
    const user = useSelector(selectUser)
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchOrder = async () => {
            setLoading(true)
            try {
                const idToken = await auth.currentUser.getIdToken()

                const orders = await fetchOrders(idToken)
                const slicedOrders = orders.slice(0, 2)
                setOrders(slicedOrders)
            } catch (error) {
                console.log(error.message)
            } finally {
                setLoading(false)
            }
        }

        fetchOrder()
    }, [user.uid])

    console.log('Orders here:', orders)

    return (
        <div className='flex flex-col w-full h-full overflow-hidden'>
            <h1 className='font-header text-dark-brown text-header'>Recent Orders</h1>

            <div className='relative'>
                <TruckComponentLoader loading={loading}/>
                <div className='relative flex flex-col w-full space-y-8 mt-8'>
                    {orders.map((order, index) => (
                        <RecentOrderItem key={index} order={order}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default RecentOrders
