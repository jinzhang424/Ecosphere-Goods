import React, { useState } from 'react'
import RegisterPanel from './user-credentials/RegisterPanel'
import SignInPanel from './user-credentials/SignInPanel'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const LogInRegisterSlider = () => {
    const [slide1, setSlide1] = useState(0);
    const [slide2, setSlide2] = useState(-1);

    const setLogin = () => {
        setSlide1(slide1 + 1)
        setSlide2(slide2 - 1)
    }

    const setRegister = () => {
        setSlide1(slide1 - 1)
        setSlide2(slide2 + 1)
    }

    return (
        <div className='bg-off-white w-screen h-screen overflow-hidden relative'>
            <div 
                className='absolute flex-shrink-0 w-1/2 h-full bg-off-white z-10 transition-transform ease-in-out duration-500'
                style={{ transform: `translateX(${(slide1) * 100}%)` }}
            >
                <SignInPanel/>
            </div>

            <div 
                className='absolute flex-shrink-0 w-1/2 h-full bg-off-white z-10 transition-transform ease-in-out duration-500'
                style={{ transform: `translateX(${(slide1 + 2) * 100}%)` }}
            >
                <RegisterPanel backToSignIn={ () => setLogin(0)}/>
            </div>

            <div 
                className='absolute w-full h-full'
            >
                <div className='absolute w-screen h-full bg-cover bg-center bg-[url("https://images.squarespace-cdn.com/content/v1/54d269d6e4b05f7dfea5187f/8637ff84-958f-4f75-adec-fcb6bcf7f702/cambria-hires-12.jpg")]'>
                    <div className='flex w-full h-full bg-tint'>
                        <div className='flex flex-col justify-center items-center w-1/2 p-40 text-center text-off-white space-y-8 transition-transform ease-in-out duration-500'
                            style={{ transform: `translateX(${(slide2) * 100}%)` }}
                        >
                            <h1 className='text-header font-LHeader '>Join our journey for a greener planet!</h1>
                            <p>Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem IpsumLorem Ipsum</p>
                            <button className='p-3 w-48 bg-dark-brown rounded-full font-header hover:scale-110 transition-transform ease-in-out duration-300' onClick={ setLogin }>Login</button>
                        </div>

                        <div className='flex flex-col justify-center items-center w-1/2 p-40 text-center text-off-white space-y-8 transition-transform ease-in-out duration-500'
                            style={{ transform: `translateX(${(slide2 + 1) * 100}%)` }}
                        >
                            <h1 className='text-header font-LHeader '>Let's create a greener planet for all!</h1>
                            <p>Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem IpsumLorem Ipsum</p>
                            <button className='p-3 w-48 bg-dark-brown rounded-full font-header hover:scale-110 transition-transform ease-in-out duration-300' onClick={ setRegister }>Register</button>
                        </div>

                    </div>
                </div>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default LogInRegisterSlider
