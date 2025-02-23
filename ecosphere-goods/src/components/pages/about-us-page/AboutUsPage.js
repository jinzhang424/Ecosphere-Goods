import React from 'react'
import AboutUsSection from './AboutUsSection'

const AboutUsPage = () => {
    return (
        <div className='border-b-2 border-dark-brown border-opacity-20'>
            <div className='flex justify-center items-center bg-dark-brown p max-h-96 overflow-hidden'>
                <header className='absolute text-8xl font-header text-off-white z-10'>About Us</header>

                <div className='inset-0 bg-black opacity-20 h-full'/>

                <img 
                    className='object-cover object-center w-full h-full'
                    src="https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="" 
                />
            </div>

            <div className='bg-off-white'>
                <AboutUsSection/>
            </div>
        </div>
    )
}

export default AboutUsPage
