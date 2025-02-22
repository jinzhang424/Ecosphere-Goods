import React, { useRef } from 'react'
import TextInputWithHeading from '../../../utility/input/TextInputWithHeading'
import UncontainedButton from '../../../utility/general-buttons/UncontainedButton';
import { BiLock } from "react-icons/bi";
import ContainedBrownButton from '../../../utility/general-buttons/ContainedBrownButton'
import { useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../../firebase';
import { toast } from 'react-toastify';

const PasswordResetPanel = () => {
    const formRef = useRef(null)
    const navigate = useNavigate()

    const handleSend = async (e) => {
        e.preventDefault()

        const formData = new FormData(formRef.current)
        const data = Object.fromEntries(formData.entries())

        console.log(data)

        try {
            await sendPasswordResetEmail(auth, data.email)
            toast.success('Email has successfully been sent to your inbox inbox!')
        } catch (error) {
            toast.error(error.message)
            console.error(error.message)
        }
    }

    return (
        <div className='flex flex-col w-full h-full items-center text-dark-brown justify-between flex-shrink-0 p-10'>
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

                <div className='grid grid-cols-2 w-full gap-24'>
                    <div className='flex-grow'>
                        <UncontainedButton 
                            onClick={() => navigate(-1)} 
                            rounded={false}
                        >
                            Cancel
                        </UncontainedButton>
                    </div>

                    <div className='flex-grow'>
                        <ContainedBrownButton 
                            className='font-header bg-dark-brown text-off-white p-3 pl-4 pr-4 rounded-lg flex-grow' 
                            type='submit'
                            rounded={false}
                        >
                            Send
                        </ContainedBrownButton>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default PasswordResetPanel
