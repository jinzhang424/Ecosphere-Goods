import React from 'react'
import DashBoardNav from '../components/Dashboard/DashBoardNav'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { OrderProvider } from '../components/Dashboard/Order/OrderContext'

const DashBoardLayout = () => {

  return (
    <OrderProvider>
      <div className='flex space-x-8 h-screen p-8 bg-light-brown'>
        <DashBoardNav/>
        <main className='w-full'><Outlet/></main>
        <ToastContainer/>
      </div>
    </OrderProvider>
  )
}

export default DashBoardLayout
