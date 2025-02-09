import React, { useContext, useEffect, useState } from 'react'
import OrderDisplay from './OrderDisplay'
import { fetchOrders } from '../../../utilityFunctions/orderHandling'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../features/userSlice'
import { toast } from 'react-toastify'
import { OrderContext } from './OrderContext'
import TruckComponentLoader from '../../animations/TruckComponentLoader'
import PaginationButtons from '../../utility/PaginationButtons'
import { PaginationContext } from '../../PaginationContext'

const Orders = () => {
  const { orders, setOrders } = useContext(OrderContext)
  const [ loading, setLoading ] = useState(false)
  const user = useSelector(selectUser)

  const { setItems, itemsOnPage, curPage, loadingItemsOnPage, itemsPerPage, setItemsPerPage } = useContext(PaginationContext)

  useEffect(() => {
    const getOrders = async () => {
      setLoading(true)
      try {
        const orders = await fetchOrders(user.uid)
        setOrders(orders)
        setLoading(false)
      } catch (error) {
        console.log(error.message)
        toast.error('Error occurred while fetching products.')
      }
    }

    getOrders()

  }, [user.uid])

  useEffect(() => {
    setItemsPerPage(2)

    if (orders.length !== 0) {
      setItems(orders)
    }
  }, [orders, setItemsPerPage])

  return (
    <div className='bg-off-white rounded-3xl w-full h-fit p-8 min-h-full'>

      <h1 className='font-header text-header text-dark-brown'>Orders</h1>

      <div className='relative h-fit overflow-hidden mt-4'>
        <TruckComponentLoader loading={loading || loadingItemsOnPage}/>

        {!(loading || loadingItemsOnPage) && 
          <div className='grid grid-rows-2 gap-8 rounded-2xl'>
            {itemsOnPage[curPage - 1]?.map((order, orderID) => (
              <OrderDisplay key={orderID} order={order}/>
            ))}
          </div>
        }

        <div className='mt-8'>
          <PaginationButtons/>
        </div>
      </div>
    </div>
  )
}

export default Orders
