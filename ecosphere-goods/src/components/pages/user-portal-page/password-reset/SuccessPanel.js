import React from 'react'
import { GiPartyPopper } from "react-icons/gi";
import ContainedBrownButton from '../../../utility/general-buttons/ContainedBrownButton'
import UncontainedButton from '../../../utility/general-buttons/UncontainedButton';
import { useNavigate } from 'react-router-dom';

const SuccessPanel = ({ prevSlide }) => {
    const navigate = useNavigate()

    const handleRedirecToSignIn = () => {
        navigate('/user-portal')
    }

    return (
        <div className='flex flex-col w-full h-full items-center text-dark-brown justify-between flex-shrink-0 p-10'>
            <div className='rounded-full border-8 p-4 border-dark-brown'>
                <GiPartyPopper size={100}/>
            </div>

            <h1 className='font-header text-header text-center'>Password resent link successfully sent!</h1>

            <p className='text-center w-11/12'>We have sent the password reset link and instructions to your inbox.</p>

            <div className='grid grid-cols-2 w-full gap-24'>
                <div className='flex-grow'>
                    <UncontainedButton 
                        onClick={prevSlide}
                        rounded={false}
                    >
                        Back
                    </UncontainedButton>
                </div>

                <div className='flex-grow'>
                    <ContainedBrownButton 
                        className='font-header bg-dark-brown text-off-white p-3 pl-4 pr-4 rounded-lg flex-grow' 
                        rounded={false}
                        onClick={handleRedirecToSignIn}
                    >
                        Sign In
                    </ContainedBrownButton>
                </div>
            </div>
        </div>
    )
}

export default SuccessPanel
