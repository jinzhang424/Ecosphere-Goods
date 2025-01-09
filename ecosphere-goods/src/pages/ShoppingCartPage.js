import React from 'react'
import { Link } from 'react-router-dom'
import CartItemDisplay from '../components/ShoppingCart/CartItemDisplay'
import { FaArrowLeftLong } from "react-icons/fa6";
import FinalPricingInformation from '../components/ShoppingCart/FinalPricingInformation';

const ShoppingCartPage = () => {
    return (
        <div className='flex h-screen w-screen'>
            <Link 
                to='/products'
                className='absolute flex items-center space-x-4 mt-12 ml-10 hover:scale-110 transition-transform ease-in-out duration-300'
            >
                <FaArrowLeftLong/>
                <p className='text-dark-brown font-header'>Back To Shopping</p>
            </Link>

            <div className='w-9/13 bg-off-white p-32 pt-24 pb-8 font-header text-dark-brown'>
                <CartItemDisplay/>
            </div>
            <div className='w-4/13 bg-reddish-beige p-16 pt-28'>
                <FinalPricingInformation/>
            </div>
        </div>
    )
}

export default ShoppingCartPage
