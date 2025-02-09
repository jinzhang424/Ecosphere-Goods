import React from 'react'
import RegisterEmail from './RegisterEmail'
import BackToBrowsingButton from '../utility/BackToBrowsingButton'

const RegisterPanel = ({ backToSignIn }) => {
    return (
        <div className={`w-full flex-shrink-0 space-y-8 p-32`}>
            <BackToBrowsingButton/>
            <h1 className='font-LHeader text-header'>Register</h1>
            <RegisterEmail backToSignIn={ backToSignIn }/>
        </div>
    )
}

export default RegisterPanel
