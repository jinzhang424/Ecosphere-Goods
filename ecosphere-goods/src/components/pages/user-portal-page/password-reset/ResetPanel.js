import React, { useRef, useState } from 'react'
import TextInputWithHeading from '../../../utility/input/TextInputWithHeading'
import UncontainedButton from '../../../utility/general-buttons/UncontainedButton';
import { BiLock } from "react-icons/bi";
import ContainedBrownButton from '../../../utility/general-buttons/ContainedBrownButton'
import { useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../../firebase';
import { toast } from 'react-toastify';
import PanelContainer from './PanelContainer';

const ResetPanel = ({ nextSlide }) => {
    const formRef = useRef(null)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const handleSend = async (e) => {
        setLoading(true)
        e.preventDefault()

        const formData = new FormData(formRef.current)
        const data = Object.fromEntries(formData.entries())

        try {
            await sendPasswordResetEmail(auth, data.email)
            nextSlide()
        } catch (error) {
            toast.error(error.message)
            console.error(error.message)
        }

        setLoading(false)
    }

    const heading = "Forgot your password?"
    const bodyText = "Enter your email below and we'll send you a password reset link!"

    return (
        <PanelContainer
            icon={<BiLock size={100}/>}
            heading={heading}
            bodyText={bodyText}
        >
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
                            onClick={(e) => {
                                e.preventDefault()
                                navigate(-1)
                            }} 
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
                            loading={loading}
                        >
                            Send
                        </ContainedBrownButton>
                    </div>
                </div>
            </form>
        </PanelContainer>
    )
}

export default ResetPanel
