import React from 'react'
import SignInPanel from '../components/UserCredentials/SignInPanel'
import RegisterPanel from '../components/UserCredentials/RegisterPanel'

const UserPortalPage = () => {
  return (
    <div>
      <div className='flex bg-dark-brown'>
        <div className='flex h-screen w-1/2 p-32 pl-40 pr-40'>
          <div className='flex w=full h-full overflow-hidden bg-off-white rounded-3xl'>
            <RegisterPanel style='p-12 pl-16 pr-16'/>
            <SignInPanel style='p-12 pl-16 pr-16'/>
          </div>
        </div>

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
