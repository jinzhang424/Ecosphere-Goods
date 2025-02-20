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
                placeholder={deliveryInfo?.address ? deliveryInfo?.address : 'Example 6 St'}
            />
            <TextInputWithHeading 
                heading="Country"
                placeholder={deliveryInfo?.country ? deliveryInfo?.country : 'Country'}
            />

            <div className='flex gap-8'>
                <TextInputWithHeading 
                    heading="Phone"
                    className="flex-grow"
                    placeholder={deliveryInfo?.phoneNumber ? deliveryInfo?.phoneNumber : 'Phone'}
                />
                <TextInputWithHeading 
                    heading="Zip Code"
                    placeholder={deliveryInfo?.zipCode ? deliveryInfo?.zipCode : 'Zip Code'}
                />
            </div>
        </SettingsSection>
    )
}

export default DeliveryInfo
