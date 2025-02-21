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
                    placeholder="First Name"
                    name="firstName"
                    value={user.firstName}
                />
                <TextInputWithHeading 
                    heading="Last Name" 
                    className='flex-grow' 
                    placeholder="Last Name"
                    name="lastName"
                    value={user.lastName}
                />
            </div>

            <TextInputWithHeading 
                heading="Email" 
                placeholder='example123@gmail.com'
                name="email"
                value={user.email}
            />
        </SettingsSection>
    )
}

export default PersonalInfo
