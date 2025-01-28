import React from 'react'
import UserDashBoard from '../components/Dashboard/UserDashBoard'
import AdminDashBoard from '../components/Dashboard/AdminDashBoard'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'

const DashBoardHomePage = () => {
  const user = useSelector(selectUser)

  return (
    <div className='w-full h-full'>
      { user.role === 'admin' ? <AdminDashBoard/> : <UserDashBoard/> }
    </div>
  )
}

export default DashBoardHomePage
