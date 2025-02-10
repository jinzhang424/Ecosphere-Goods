import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../../features/userSlice'
import RoundedImageInput from '../../../utility/input/RoundedImageInput';

const UserProfileCard = () => {
    const user = useSelector(selectUser)
    const userPoints = useState(0)

    console.log(user)

    return (
        <div className='w-full h-full'>
            <div className='flex space-x-8'>
                <div className='w-24 h-24'><RoundedImageInput/></div>
                <div className='flex flex-col'>
                    <span className='font-header text-header'>{user.email || 'Example name'}</span>
                    <span className='font-header text-subtitle opacity-80'>{user.deliveryInfo?.address || `Example 6 St`}</span>
                </div>
            </div>

            <article className='font-header text-header mt-4 w-full'>
                <h1 className='text-sHeader opacity-60'>Your Points:</h1>
                <h1 className='mr-auto ml-auto w-fit text-LHeader'>{userPoints}</h1>
            </article>
        </div>
    )
}

export default UserProfileCard
