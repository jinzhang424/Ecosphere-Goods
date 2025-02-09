import React from 'react'
import DashBoardNav from '../components/Dashboard/DashBoardNav'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { OrderProvider } from '../components/Dashboard/Order/OrderContext'

const DashBoardLayout = () => {

  return (
    <OrderProvider>
      <div className={`flex h-fit bg-light-brown min-h-screen w-full`}>
        <div className='h-screen p-8'><DashBoardNav/></div>
        <main className='w-11/12 pb-8 pr-8 pt-8'><Outlet/></main>
        <ToastContainer/>
      </div>
    </OrderProvider>
  )
}

export default DashBoardLayout
