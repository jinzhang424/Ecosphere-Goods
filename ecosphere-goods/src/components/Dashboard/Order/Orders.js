import React, { useContext, useEffect, useState } from 'react'
import OrderItems from './OrderItems'
import { fetchOrders } from '../../../utilityFunctions/orderHandling'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../features/userSlice'
import { toast } from 'react-toastify'
import { OrderContext } from './OrderContext'

const Orders = () => {
  const { orders, setOrders } = useContext(OrderContext)
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

  }, [user.uid])
  
  console.log(orders)

  return (
    <div className='bg-off-white rounded-3xl w-full h-full p-8'>
      <h1 className='font-header text-header text-dark-brown'>Orders</h1>
      <div className='h-full overflow-hidden'>
        
      </div>
    </div>
  )
}

export default Orders
