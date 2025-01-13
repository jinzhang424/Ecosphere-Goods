import React from 'react'
import DashBoardNav from '../components/Dashboard/DashBoardNav'
import { Outlet } from 'react-router-dom'

const DashBoardLayout = () => {
  return (
    <div className='flex space-x-8 h-screen p-8 bg-light-brown'>
      <DashBoardNav/>
      <main className='w-full'><Outlet/></main>
    </div>
  )
}

export default DashBoardLayout
