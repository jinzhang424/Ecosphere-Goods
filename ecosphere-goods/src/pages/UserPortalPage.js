import React from 'react'
import SignInRegisterSlider from '../components/utility/SignInRegisterSlider'

const UserPortalPage = () => {
  return (
    <div>
      <div className='flex bg-dark-brown'>
        <SignInRegisterSlider/>

        <img 
          className='w-1/2 h-screen z-50'
          src="https://images.squarespace-cdn.com/content/v1/54d269d6e4b05f7dfea5187f/8637ff84-958f-4f75-adec-fcb6bcf7f702/cambria-hires-12.jpg" 
          alt="" 
        />
      </div>
    </div>
  )
}

export default UserPortalPage
