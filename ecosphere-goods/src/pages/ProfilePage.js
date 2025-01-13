import React from 'react'
import UserDashBoard from '../components/Dashboard/UserDashBoard'
import DashBoardNav from '../components/Dashboard/DashBoardNav'

const ProfilePage = () => {
  return (
    <div className='flex space-x-8 h-screen p-8 bg-light-brown'>
      <div className='w-fit'>
        <DashBoardNav/>
      </div>

      <div className='w-11/12'>
        <UserDashBoard/>
      </div>
    </div>
  )
}

export default ProfilePage
