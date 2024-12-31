import React from 'react'
import RegisterEmail from './RegisterEmail'

const RegisterPanel = () => {
    return (
        <div className={`w-full flex-shrink-0 space-y-8 p-32`}>
            <h1 className='font-LHeader text-header'>Register</h1>
            <RegisterEmail/>
        </div>
    )
}

export default RegisterPanel
