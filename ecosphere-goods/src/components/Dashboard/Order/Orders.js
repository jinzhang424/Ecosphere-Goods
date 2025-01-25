import React, { useContext, useEffect, useState } from 'react'
import OrderDisplay from './OrderDisplay'
import { fetchOrders } from '../../../utilityFunctions/orderHandling'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../features/userSlice'
import { toast } from 'react-toastify'
import { OrderContext } from './OrderContext'

const Orders = () => {
  const { orders, setOrders } = useContext(OrderContext)
  const [ isLoading, setIsLoading ] = useState(false)
  const user = useSelector(selectUser)

  useEffect(() => {
    const getOrders = async () => {
      setIsLoading(true)
      try {
        const orders = await fetchOrders(user.uid)
        setOrders(orders)
        setIsLoading(false)
      } catch (error) {
        console.log(error.message)
        toast.error('Error occurred while fetching products.')
      }
    }

    getOrders()

  }, [user.uid])

  return (
    <div className='bg-off-white rounded-3xl w-full h-fit p-8'>

      <h1 className='font-header text-header text-dark-brown'>Orders</h1>

      <div className='h-fit overflow-hidden mt-4'>
        {isLoading ? (
          <div>Is Loading</div>
        ) : (
          <div className='flex flex-col space-y-8'>
            {orders.map((order, orderID) => (
              <OrderDisplay key={orderID} order={order}/>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Orders
