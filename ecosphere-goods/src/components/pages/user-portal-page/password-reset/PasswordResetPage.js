import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify';
import PasswordResetPanel from './PasswordResetPanel';
import SuccessPanel from './SuccessPanel';

const PasswordResetPage = () => {
    const [slide, setSlide] = useState(0)

    console.log(slide)

    return (
        <div className='flex justify-center items-center h-screen w-full bg-light-brown p-4'>
            <div className='flex h-5/6 max-w-md bg-off-white rounded-xl overflow-hidden'>
                <div 
                    className='flex w-full h-full transition-transform ease-in-out duration-300' 
                    style={{ transform: `translateX(-${slide * 100}%)` }}
                >
                    <PasswordResetPanel nextSlide={() => setSlide(1)}/>
                    <SuccessPanel prevSlide={() => setSlide(0)}/>
                </div>
            </div>

            <ToastContainer/>
        </div>
    )
}

export default PasswordResetPage
