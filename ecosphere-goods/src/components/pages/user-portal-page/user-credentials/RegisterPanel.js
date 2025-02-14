import React from 'react'
import RegisterEmail from './RegisterEmail'
import BackToBrowsingButton from '../../../utility/general-buttons/BackToBrowsingButton'

const RegisterPanel = ({ backToSignIn }) => {
    return (
        <div className={`w-full flex-shrink-0 space-y-8 p-32`}>
            <BackToBrowsingButton>Back To Browsing</BackToBrowsingButton>
            <h1 className='font-LHeader text-header'>Register</h1>
            <RegisterEmail backToSignIn={ backToSignIn }/>
        </div>
    )
}

export default RegisterPanel
