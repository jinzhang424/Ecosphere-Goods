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
                label="Address"
                placeholder='Example 6 St'
                name="address"
                value={deliveryInfo?.address}
            />
            <TextInputWithHeading 
                label="Country"
                placeholder='Country'
                name="country"
                value={deliveryInfo?.country}
            />

            <div className='flex gap-8'>
                <TextInputWithHeading 
                    label="Phone"
                    className="flex-grow"
                    placeholder='Phone'
                    name="phone"
                    value={deliveryInfo?.phoneNumber}
                />
                <TextInputWithHeading 
                    label="Zip Code"
                    placeholder='Zip Code'
                    name="zipCode"
                    value={deliveryInfo?.zipCode}
                />
            </div>
        </SettingsSection>
    )
}

export default DeliveryInfo
