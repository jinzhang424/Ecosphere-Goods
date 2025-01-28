import React from 'react'
import DashBoardNav from '../components/Dashboard/DashBoardNav'
import { Outlet, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { OrderProvider } from '../components/Dashboard/Order/OrderContext'

const DashBoardLayout = () => {
  const location = useLocation()

  return (
    <OrderProvider>
      <div className={`flex ${location.pathname == '/orders' ? 'h-fit' : 'h-screen'} p-8 bg-light-brown min-h-screen w-screen`}>
        <DashBoardNav/>
        <main className='w-11/12 ml-8'><Outlet/></main>
        <ToastContainer/>
      </div>
    </OrderProvider>
  )
}

export default DashBoardLayout
