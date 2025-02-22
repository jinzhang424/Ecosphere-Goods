import React from 'react'
import TextInputWithHeading from '../../../utility/input/TextInputWithHeading'
import { BiLock } from "react-icons/bi";

const PasswordResetPage = () => {
    return (
        <div className='flex justify-center items-center h-screen w-full bg-light-brown'>
            <div className='flex flex-col items-center text-dark-brown bg-off-white p-10 rounded-xl h-5/6 max-w-md justify-between'>
                <div className='rounded-full border-8 p-4 border-dark-brown'>
                    <BiLock size={100}/>
                </div>

                <h1 className='font-header text-header text-center'>Forgot your password?</h1>

                <p className='text-center w-11/12'>Enter your email below and we'll send you a password reset link!</p>
                
                <TextInputWithHeading type='email' className="w-full"/>
                

                <div className='flex w-full gap-24'>
                    <button className='font-header bg-dark-brown p-3 pl-4 pr-4 rounded-lg flex-grow border-2 border-dark-brown bg-opacity-0 hover:bg-opacity-100'>Cancel</button>
                    <button className='font-header bg-dark-brown text-off-white p-3 pl-4 pr-4 rounded-lg flex-grow'>Send</button>
                </div>
            </div>
        </div>
    )
}

export default PasswordResetPage
