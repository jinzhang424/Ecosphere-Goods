import React, { useRef, useState } from 'react'
import BasicInfo from './BasicInfo'
import DeliveryInfo from './DeliveryInfo'
import RoundedImageInput from '../../../utility/input/RoundedImageInput'
import UncontainedButton from '../../../utility/general-buttons/UncontainedButton'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../../features/userSlice'
import { updateDeliveryInfo } from '../../../../api/userInfoHandling'
import { auth } from '../../../../firebase'

const DashBoardSettingsPage = () => {
  const [loading, setLoading] = useState(false);
  const user = useSelector(selectUser)
  const formRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true);

    const formData = new FormData(formRef.current)
    const data = Object.fromEntries(formData.entries())
    
    try {
      console.log(data)
      const idToken = await auth.currentUser.getIdToken()

      await updateDeliveryInfo(data.address, data.country, data.zipCode, data.phone, idToken)

      console.log('SUCCEESSFULY UDPATED INFO')
    } catch (error) {
      console.error(error.message);
    }

    setLoading(false);
  }

  return (
    <div className='flex flex-col gap-8 bg-off-white rounded-3xl h-full p-8 text-dark-brown'>
      <h1 className='text-header font-header w-full border-b-2 border-dark-brown border-opacity-10 pb-4'>Settings</h1>

      <div className='flex text-dark-brown font-header gap-2 text-lg h-8 items-center'>
        <div className='w-8 aspect-square'><RoundedImageInput/></div>
        <p>{user.firstName ? user.firstName : 'Your'}</p>
        <p>{user.lastName ? user.lastName : 'Name'}</p>
      </div>
      
      <form ref={formRef} className='grid grid-cols-2 gap-8' onSubmit={handleSubmit}>
        <BasicInfo/>
        <DeliveryInfo/>

        <div className='max-w-44'>
          <UncontainedButton loading={loading}>
            Save Changes
          </UncontainedButton>
        </div>
      </form>
    </div>
  )
}

export default DashBoardSettingsPage
