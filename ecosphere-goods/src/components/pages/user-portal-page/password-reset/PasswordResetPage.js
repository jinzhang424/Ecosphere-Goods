import React from 'react'
import { ToastContainer } from 'react-toastify';
import PasswordResetPanel from './PasswordResetPanel';
import SuccessPanel from './SuccessPanel';

const PasswordResetPage = () => {

    return (
        <div className='flex justify-center items-center h-screen w-full bg-light-brown p-4'>
            <div className='flex h-5/6 max-w-md bg-off-white rounded-xl overflow-hidden'>
                <PasswordResetPanel/>
                <SuccessPanel/>
            </div>

            <ToastContainer/>
        </div>
    )
}

export default PasswordResetPage
