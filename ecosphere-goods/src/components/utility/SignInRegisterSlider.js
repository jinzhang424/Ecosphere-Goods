import React, { useState } from 'react'
import RegisterPanel from '../UserCredentials/RegisterPanel'
import SignInPanel from '../UserCredentials/SignInPanel'

const SignInRegisterSlider = () => {
    const [slide, setSlide] = useState(0);

    console.log(slide)

    return (
        <div className='flex h-screen w-1/2 p-32 pl-40 pr-40'>
            <div className='flex w=full h-full overflow-hidden bg-off-white rounded-3xl'>
                <div 
                    className='flex transition-transform duration-500 ease-in-out w-full'
                    style={{ transform: `translateX(-${slide * 100}%)` }}
                >
                    <div className='flex-shrink-0 w-full'>
                        <SignInPanel style='p-12 pl-16 pr-16' setSignUp={ () => setSlide(1) }/>
                    </div>
                    <div className='flex-shrink-0 w-full'>
                        <RegisterPanel style='p-12 pl-16 pr-16'/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignInRegisterSlider
