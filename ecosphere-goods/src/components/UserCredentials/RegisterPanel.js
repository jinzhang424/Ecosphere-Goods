import React, { useState } from 'react'
import RegisterDetailsSlider from './RegisterDetailsSlider'

const RegisterPanel = ({ style='' }) => {

    return (
        <div className={`w-full flex-shrink-0 ${style} space-y-8`}>
            <h1 className='font-LHeader text-header'>Register</h1>
            <RegisterDetailsSlider/>
            
        </div>
    )
}

export default RegisterPanel
