import React, { useState } from 'react'
import { TextField } from '@mui/material'
import TransitionContainedButton from '../utility/TransitionContainedButton'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'
import { updateDeliveryAddress } from '../../utilityFunctions/userAuth'
import { toast } from 'react-toastify'

const DeliveryAddressDialog = ({ open = false, closeDialog }) => {
    const [address, setAddress] = useState('')
    const [country, setCountry] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const user = useSelector(selectUser)

    const handleSubmit = async () => {
        
        try {
            await updateDeliveryAddress(user.uid, address, country, zipCode, phoneNumber)
            closeDialog()
            toast.success('Delivery address has been updated')
        } catch (error) {
            toast.error('Error occurred while trying to update your delivery address')
            console.error(error.message)
        }
    }

    return (
        <div>
            {open && (
                <>
                    <div className='fixed inset-0 bg-black opacity-30'/>

                    <dialog open className='fixed inset-0 z-40 w-4/12 p-12 rounded-3xl text-dark-brown space-y-10'>
                        <h1 className='text-header font-header'>Delivery Address</h1>
                        <form action="submit" className='flex flex-col space-y-12' onSubmit={handleSubmit}>
                            <TextField 
                                label={'Address'} 
                                sx={{ borderColor: '#362D2D'}} 
                                fullWidth
                                onChange={(e) => setAddress(e.target.value)} 
                                value={address}
                                id='address'
                                required
                            />

                            <TextField 
                                label={'Phone Number'} 
                                sx={{ borderColor: '#362D2D'}} 
                                onChange={(e) => setPhoneNumber(e.target.value)} 
                                value={phoneNumber}
                                id='phoneNumber'
                                required
                            />

                            <div className='flex space-x-6'>
                                <TextField 
                                    label={'Zip Code'} 
                                    sx={{ borderColor: '#362D2D'}} 
                                    onChange={(e) => setZipCode(e.target.value)} 
                                    value={zipCode}
                                    id='zipCode'
                                    required
                                />

                                <TextField 
                                    label={'Country'} 
                                    sx={{ borderColor: '#362D2D'}} 
                                    onChange={(e) => setCountry(e.target.value)} 
                                    value={country}
                                    id='country'
                                    required
                                />
                            </div>

                            <div className='flex font-header justify-between'>
                                <TransitionContainedButton label={'Cancel'} onClick={closeDialog}/>
                                <TransitionContainedButton label={'Submit'} type='submit'/>
                            </div>
                        </form>
                    </dialog>
                </>
            )}
        </div>
    )
}

export default DeliveryAddressDialog
