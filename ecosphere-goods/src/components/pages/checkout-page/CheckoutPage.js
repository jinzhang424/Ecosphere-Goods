import React from 'react';
import { FaArrowLeftLong } from "react-icons/fa6";
import FinalPricingInformation from './FinalPricingInformation';
import CartItemDisplay from '../../shopping-cart/CartItemDisplay';
import BackToBrowsingButton from '../../utility/general-buttons/BackToBrowsingButton'

const CheckoutPage = () => {
    return (
        <div className='flex h-screen w-screen'>
            <BackToBrowsingButton 
                className='absolute flex items-center space-x-4 mt-12 ml-10 hover:scale-110 transition-transform ease-in-out duration-300'
            >
                <p className='text-dark-brown font-header'>Back To Shopping</p>
            </BackToBrowsingButton>

            <div className='w-9/13 bg-off-white p-32 pt-24 pb-8 font-header text-dark-brown'>
                <CartItemDisplay/>
            </div>
            <div className='w-4/13 bg-reddish-beige p-16 pt-28'>
                <FinalPricingInformation/>
            </div>
        </div>
    )
}

export default CheckoutPage
