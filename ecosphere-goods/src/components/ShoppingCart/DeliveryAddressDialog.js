import React from 'react'
import { TextField } from '@mui/material'
import TransitionContainedButton from '../utility/TransitionContainedButton'

const DeliveryAddressDialog = ({ open = false, closeDialog, submit }) => {
    return (
        <div>
            {open && (
                <>
                    <div className='fixed inset-0 bg-black opacity-30'/>

                    <dialog open className='fixed inset-0 z-40 w-1/4 p-8 rounded-3xl text-dark-brown space-y-6'>
                        <h1 className='text-header font-header'>Delivery Address</h1>
                        <TextField label={'Delivery Address'} sx={{ borderColor: '#362D2D'}} fullWidth/>

                        <div className='flex font-header justify-between'>
                            <TransitionContainedButton label={'Cancel'} onClick={closeDialog}/>
                            <TransitionContainedButton label={'Submit'} onClick={handleSubmit}/>
                        </div>
                    </dialog>
                </>
            )}
        </div>
    )
}

export default DeliveryAddressDialog
