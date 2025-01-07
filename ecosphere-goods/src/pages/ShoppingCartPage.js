import React from 'react'
import { Link } from 'react-router-dom'
import CartItemDisplay from '../components/ShoppingCart/CartItemDisplay'
import { FaArrowLeftLong } from "react-icons/fa6";

const ShoppingCartPage = () => {
    return (
        <div className='flex h-screen'>
            <Link 
                to='/products'
                className='absolute flex items-center space-x-4 mt-12 ml-10 hover:scale-110 transition-transform ease-in-out duration-300'
            >
                <FaArrowLeftLong/>
                <p className='text-dark-brown font-header'>Back To Shopping</p>
            </Link>

            <div className='w-9/12 bg-off-white p-32 pt-24 pb-0 font-header text-dark-brown'>
                <CartItemDisplay/>
            </div>
            <div className='w-3/12 bg-reddish-beige'>
                hi
            </div>
        </div>
    )
}

export default ShoppingCartPage
