import React from 'react'
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";

const InsufficientPermissionsPage = () => {
    const navigate = useNavigate()

    const handleBackClick = () => {
        navigate(-2)
    }

    return (
        <div className='h-screen bg-dark-brown pt-60 text-off-white flex flex-col items-center space-y-10'>
            <div className='flex flex-col items-center space-y-4'>
                <FaLock className='w-20 h-20'/>
                <p className='text-LHeader font-header'>Sorry, you do not have permission to view this page</p>
                <p className='text-sHeader font-header opacity-90'>To view this page, you must be granted admin access</p>
            </div>
            <button className='text-dark-brown p-3 pl-10 pr-10 border-3 rounded-full font-header bg-off-white text-2xl hover:bg-opacity-10 hover:text-off-white transition-all ease-in-out duration-300' onClick={ handleBackClick }>Return</button>
        </div>
    )
}

export default InsufficientPermissionsPage
