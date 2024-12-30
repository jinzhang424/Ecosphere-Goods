import React, { useState } from 'react'
import RegisterSlider from './RegisterSlider'
import RegisterEmail from './RegisterEmail'
import RegisterPersonalInfo from './RegisterPersonalInfo'

const RegisterPanel = ({ style='', backToSignIn}) => {

    return (
        <div className={`w-full flex-shrink-0 ${style} space-y-8`}>
            <h1 className='font-LHeader text-header'>Register</h1>
            <RegisterSlider backToSignIn={ backToSignIn }>
                <RegisterEmail/>
                <RegisterPersonalInfo/>
            </RegisterSlider>
        </div>
    )
}

export default RegisterPanel
