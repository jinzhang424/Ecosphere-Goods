import React from 'react'
import TextInputWithHeading from '../../../utility/input/TextInputWithHeading'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../../features/userSlice'
import SettingsSection from './SettingsSection'

const DeliveryInfo = () => {
    const user = useSelector(selectUser)
    const deliveryInfo = user?.deliveryInfo

    return (
        <SettingsSection heading="Delivery Info">
            <TextInputWithHeading 
                heading="Address"
                placeholder='Example 6 St'
                name="address"
                value={deliveryInfo?.address}
            />
            <TextInputWithHeading 
                heading="Country"
                placeholder='Country'
                name="country"
                value={deliveryInfo?.country}
            />

            <div className='flex gap-8'>
                <TextInputWithHeading 
                    heading="Phone"
                    className="flex-grow"
                    placeholder='Phone'
                    name="phone"
                    value={deliveryInfo?.phoneNumber}
                />
                <TextInputWithHeading 
                    heading="Zip Code"
                    placeholder='Zip Code'
                    name="zipCode"
                    value={deliveryInfo?.zipCode}
                />
            </div>
        </SettingsSection>
    )
}

export default DeliveryInfo
