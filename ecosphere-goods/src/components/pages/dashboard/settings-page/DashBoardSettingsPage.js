import React from 'react'
import BasicInfo from './BasicInfo'
import DeliveryInfo from './DeliveryInfo'
import RoundedImageInput from '../../../utility/input/RoundedImageInput'
import UncontainedButton from '../../../utility/general-buttons/UncontainedButton'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../../features/userSlice'

const DashBoardSettingsPage = () => {
  const user = useSelector(selectUser)

  return (
    <div className='flex flex-col gap-8 bg-off-white rounded-3xl h-full p-8 text-dark-brown'>
      <h1 className='text-header font-header w-full border-b-2 border-dark-brown border-opacity-10 pb-4'>Settings</h1>

      <div className='flex text-dark-brown font-header gap-2 text-lg h-8 items-center'>
        <div className='w-8 aspect-square'><RoundedImageInput/></div>
        <p>{user.firstName ? user.firstName : 'Your'}</p>
        <p>{user.lastName ? user.lastName : 'Name'}</p>
      </div>
      
      <div className='grid grid-cols-2 gap-8'>
        <BasicInfo/>
        <DeliveryInfo/>
      </div>

      <div className='max-w-44'>
        <UncontainedButton>
          Save Changes
        </UncontainedButton>
      </div>
    </div>
  )
}

export default DashBoardSettingsPage
