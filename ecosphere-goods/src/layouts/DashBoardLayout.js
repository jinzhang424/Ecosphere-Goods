import React from 'react'
import DashBoardNav from '../components/Dashboard/DashBoardNav'
import { Outlet, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { OrderProvider } from '../components/Dashboard/Order/OrderContext'

const DashBoardLayout = () => {
  const location = useLocation()

  return (
    <OrderProvider>
      <div className={`flex space-x-8 ${location.pathname == '/orders' ? 'h-fit' : 'h-screen'} p-8 bg-light-brown min-h-screen`}>
        <DashBoardNav/>
        <main className='w-full'><Outlet/></main>
        <ToastContainer/>
      </div>
    </OrderProvider>
  )
}

export default DashBoardLayout
