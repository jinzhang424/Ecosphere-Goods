import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../../features/userSlice'
import SettingsSection from './SettingsSection'
import TextInputWithHeading from '../../../utility/input/TextInputWithHeading'

const PersonalInfo = () => {
    const user = useSelector(selectUser)

    return (
        <SettingsSection heading={'Basic Info'}>
            <div className='flex gap-4 w-full'>
                <TextInputWithHeading 
                    heading="First Name" 
                    className='flex-grow' 
                    placeholder={user.firstName ? user.firstName : "First Name"}
                    name="firstName"
                />
                <TextInputWithHeading 
                    heading="Last Name" 
                    className='flex-grow' 
                    placeholder={user.lastName ? user.lastName : "Last Name"}
                    name="lastName"
                />
            </div>

            <TextInputWithHeading 
                heading="Email" 
                placeholder={user.email ? user.email : 'example123@gmail.com'}
                name="email"
            />
        </SettingsSection>
    )
}

export default PersonalInfo
