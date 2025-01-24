import React, { useEffect, useState } from 'react'
import OrderItems from './OrderItems'
import { fetchOrders } from '../../../utilityFunctions/orderHandling'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../features/userSlice'
import { toast } from 'react-toastify'

const Orders = () => {
  const [orders, setOrders] = useState([])
  const user = useSelector(selectUser)

  useEffect(() => {
    const getOrders = async () => {
      try {
        const orders = await fetchOrders(user.uid)
        setOrders(orders)
      } catch (error) {
        console.log(error.message)
        toast.error('Error occurred while fetching products.')
      }
    }

    getOrders()

  }, [])

  return (
    <div className='bg-off-white rounded-3xl w-full h-full p-8  '>
      <h1 className='font-header text-header text-dark-brown'>Orders</h1>
      <OrderItems/>
    </div>
  )
}

export default Orders
