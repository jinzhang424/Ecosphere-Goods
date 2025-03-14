import React from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const BackToBrowsingButton = ({ children }) => {
    const navigate = useNavigate()

    const handleBackClick = () => {
        navigate('/products')
    }

    return (
        <button 
            onClick={ handleBackClick }
            className='absolute p-1 top-8 left-14 flex justify-center items-center space-x-3 hover:-translate-x-4 transition-transform ease-in-out duration-300'
        >
            <FaArrowLeftLong/>
            <span className='text-dark-brown font-header'>{ children }</span>
        </button>
    )
}

export default BackToBrowsingButton
