import React from 'react'
import { useNavigate } from 'react-router-dom'
import UncontainedButton from '../components/utility/UncontainedButton'

const NotFoundPage = () => {
    const navigate = useNavigate()

    const handleGoBack = () => {
        navigate(-1)
    }

    return (
        <div className='flex flex-col text-dark-brown bg-off-white h-screen justify-center items-center space-y-6 border-b-2 border-dark-brown border-opacity-50'>
            <h1 className='text-8xl font-bold text-center'>Oops!</h1>
            <h2 className='font-bold text-header text-center'>404 - Page Not Found</h2>
            <p className='text-xl w-1/2 text-center'>We can't seem to find the page you're looking for. Try going back to the previous page or contacting us for more information</p>
            
            <div className='w-1/6'>
                <UncontainedButton onClick={handleGoBack} label='Go Back'/>
            </div>
        </div>
    )
}

export default NotFoundPage
