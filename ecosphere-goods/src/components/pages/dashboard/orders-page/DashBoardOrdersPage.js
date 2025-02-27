import React, { useContext, useEffect, useState } from 'react'
import OrderDisplay from './OrderDisplay'
import { fetchOrders } from '../../../../api/orderHandling'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../../features/userSlice'
import { toast } from 'react-toastify'
import { OrderContext } from './OrderContext'
import TruckComponentLoader from '../../../animations/TruckComponentLoader'
import PaginationButtons from '../../../utility/pagination/PaginationButtons'
import { PaginationContext } from '../../../utility/pagination/PaginationContext'
import { auth } from '../../../../firebase'
import { ToastContainer } from 'react-toastify'

const DashBoardOrdersPage = () => {
  const { orders, setOrders } = useContext(OrderContext)
  const [ loading, setLoading ] = useState(false)
  const user = useSelector(selectUser)

  const { setItems, itemsOnPage, curPage, loadingItemsOnPage, setItemsPerPage } = useContext(PaginationContext)

  useEffect(() => {
    const getOrders = async () => {
      setLoading(true)
      try {
        const idToken = await auth.currentUser.getIdToken()
        const orders = await fetchOrders(idToken)

        setOrders(orders)
        setLoading(false)
        
      } catch (error) {
        console.log(error.message)
        toast.error('Error occurred while fetching products.')
      }
    }

    getOrders()

  }, [user.uid, setOrders])

  useEffect(() => {
    setItemsPerPage(2)

    if (orders.length !== 0) {
      setItems(orders)
    }
  }, [orders, setItemsPerPage, setItems])

  return (
    <div className='bg-off-white rounded-3xl w-full h-fit p-8 min-h-full'>

      <h1 className='font-header text-header text-dark-brown'>Orders</h1>

      <div className='relative top-16'><TruckComponentLoader loading={loading || loadingItemsOnPage}/></div>

      <div className={`h-fit overflow-hidden mt-4 ${(loading || loadingItemsOnPage) && 'opacity-0'} transition-opacity ease-in-out duration-300`}>
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

export default DashBoardOrdersPage
