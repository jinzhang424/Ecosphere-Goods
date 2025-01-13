import React from 'react'
import UserDashBoard from '../components/Dashboard/UserDashBoard'
import AdminDashBoard from '../components/Dashboard/AdminDashBoard'

const DashBoardHomePage = () => {
  const isAdmin = true;

  return (
    <div className='w-full h-full'>
      { isAdmin ? <AdminDashBoard/> : <UserDashBoard/> }
    </div>
  )
}

export default DashBoardHomePage
