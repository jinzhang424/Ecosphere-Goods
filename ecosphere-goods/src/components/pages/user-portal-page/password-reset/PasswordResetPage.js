import React, { useRef } from 'react'
import TextInputWithHeading from '../../../utility/input/TextInputWithHeading'
import UncontainedButton from '../../../utility/general-buttons/UncontainedButton';
import { BiLock } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../../firebase';

const PasswordResetPage = () => {
    const formRef = useRef(null)
    const navigate = useNavigate()

    const handleSend = async (e) => {
        e.preventDefault()

        const formData = new FormData(formRef.current)
        const data = Object.fromEntries(formData.entries())

        console.log(data)

        try {
            await sendPasswordResetEmail(auth, data.email)
            console.log('Successfully sent')
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <div className='flex justify-center items-center h-screen w-full bg-light-brown'>
            <div className='flex flex-col items-center text-dark-brown bg-off-white p-10 rounded-xl h-5/6 max-w-md justify-between'>
                <div className='rounded-full border-8 p-4 border-dark-brown'>
                    <BiLock size={100}/>
                </div>

                <h1 className='font-header text-header text-center'>Forgot your password?</h1>

                <p className='text-center w-11/12'>Enter your email below and we'll send you a password reset link!</p>
                
                <form ref={formRef} className="flex flex-col w-full gap-8" onSubmit={handleSend}>
                    <TextInputWithHeading 
                        type='email' 
                        className="w-full" 
                        name="email"
                        placeholder="example123@gmail.com"
                    />

                    <div className='flex w-full gap-24'>
                        <div 
                            className='flex-grow' 
                            onClick={() => navigate(-1)}
                        >
                            <UncontainedButton rounded={false}>
                                Cancel
                            </UncontainedButton>
                        </div>

                        <button 
                            className='font-header bg-dark-brown text-off-white p-3 pl-4 pr-4 rounded-lg flex-grow' 
                            type='submit'
                        >
                            Send
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PasswordResetPage
