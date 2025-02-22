import React from 'react'
import { GiPartyPopper } from "react-icons/gi";
import ContainedBrownButton from '../../../utility/general-buttons/ContainedBrownButton'
import UncontainedButton from '../../../utility/general-buttons/UncontainedButton';
import { useNavigate } from 'react-router-dom';
import PanelContainer from './PanelContainer';

const SuccessPanel = ({ prevSlide }) => {
    const navigate = useNavigate()

    const handleRedirecToSignIn = () => {
        navigate('/user-portal')
    }

    const heading = "Password resent link successfully sent!"
    const bodyText = "We have sent the password reset link and instructions to your inbox."

    return (
        <PanelContainer 
            icon={<GiPartyPopper size={100}/>}
            heading={heading}
            bodyText={bodyText}
        >
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
        </PanelContainer>
    )
}

export default SuccessPanel
