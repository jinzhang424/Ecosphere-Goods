import React from 'react'
import UserDashBoard from './UserDashBoard'
import AdminDashBoard from './AdminDashBoard'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../../features/userSlice'

const DashBoardHomePage = () => {
  const user = useSelector(selectUser)

  return (
    <div className='w-full h-full'>
      { user.role === 'admin' ? <AdminDashBoard/> : <UserDashBoard/> }
    </div>
  )
}

export default DashBoardHomePage
