import React, { useState } from 'react';
import { TextField } from '@mui/material';
import DialogButton from '../../utility/general-buttons/DialogButton';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectUser } from '../../../features/userSlice';
import { fetchDeliveryInfo, updateDeliveryInfo } from '../../../api/userInfoHandling';
import { toast } from 'react-toastify';

const DeliveryAddressDialog = ({ open = false, closeDialog }) => {
    const [address, setAddress] = useState('')
    const [country, setCountry] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [loading, setLoading] = useState(false)
    const user = useSelector(selectUser)
    const dispatch = useDispatch()

    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)
        try {
            await updateDeliveryInfo(user.uid, address, country, zipCode, phoneNumber)
            const deliveryInfo = await fetchDeliveryInfo(user.uid)
            
            dispatch(login({
                uid: user.uid,
                email: user.email,
                role: user.role,
                deliveryInfo: deliveryInfo
            }))
            closeDialog()
            toast.success('Delivery address has been updated')
        } catch (error) {
            toast.error('Error occurred while trying to update your delivery address')
            console.error(error.message)
        }
        setLoading(false)
    }

    return (
        <div>
            {open && (
                <>
                    <div className='fixed inset-0 bg-black opacity-30'/>

                    <dialog open className='fixed inset-0 z-40 w-4/12 p-12 rounded-3xl text-dark-brown space-y-10'>
                        <h1 className='text-header font-header'>Delivery Info</h1>
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
                                <DialogButton label={'Cancel'} onClick={closeDialog}/>
                                <DialogButton label={'Submit'} type='submit' loading={loading}/>
                            </div>
                        </form>
                    </dialog>
                </>
            )}
        </div>
    )
}

export default DeliveryAddressDialog
