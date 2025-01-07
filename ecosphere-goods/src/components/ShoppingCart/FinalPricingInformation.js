import React from 'react'
import { useSelector } from 'react-redux'
import { selectCart } from '../../features/shoppingCartSlice'

const FinalPricingInformation = () => {
    const cart = useSelector(selectCart)

    return (
        <div className='flex flex-col space justify-between h-full'>
            <div className='flex flex-col space-y-16 mt-4'>
               <div className='border-3 w-9/12 border-dark-brown'/>

                <div className='font-header text-dark-brown tracking-widest'>
                    <div className='flex space-x-8 items-center'>
                        <p className='text-subtitle opacity-80'>SUBTOTAL:</p>
                        <p className='text-sHeader'>$520.00</p>
                    </div>
                    <div className='flex space-x-8 items-center'>
                        <p className='text-body opacity-80'>SHIPPING:</p>
                        <p className='text-subtitle'>$5.00</p>
                    </div>
                </div>
            </div>
            
            <div className='flex flex-col space-y-12 border-t-2 border-dark-brown border-opacity-60 pt-3'>
                <div className='flex font-header text-dark-brown tracking-widest items-center space-x-8'>
                    <p className='opacity-80 text-subtitle'>CART TOTAL:</p>
                    <p className='text-header'>$525.00</p>
                </div>

                <button className='p-3 pl-6 pr-6 rounded-full bg-dark-brown text-off-white tracking-3px hover:scale-105 transition-transform ease-in-out duration-300'>CHECKOUT</button>
            </div>
        </div>
    )
}

export default FinalPricingInformation
