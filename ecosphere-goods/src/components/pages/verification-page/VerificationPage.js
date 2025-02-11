import React from 'react'
import { MdOutlineMarkEmailRead } from "react-icons/md";
import UncontainedButton from '../../utility/general-buttons/UncontainedButton';

const VerificationPage = () => {
    return (
        <div className='flex justify-center items-center w-full h-screen bg-light-brown'>
            <section className='flex flex-col items-center bg-off-white w-1/3 h-5/6 p-12 rounded-xl gap-8'>
                <MdOutlineMarkEmailRead className='text-off-white w-full h-full max-w-36 max-h-36 p-6 rounded-full bg-light-brown'/>

                <h1 className='text-dark-brown text-header font-header text-center'>
                    Check your inbox please!
                </h1>

                <body className='text-center text-dark-brown'>
                    An email verification link has been sent to your email. Please click on it to verify your email before continuation.                
                </body>

                <div className='w-2/3 mt-auto'><UncontainedButton label='Resend Verification Email'/></div>
            </section>
        </div>
    )
}

export default VerificationPage
