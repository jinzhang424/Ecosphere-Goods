import React from 'react'
import { Link } from 'react-router-dom'
import CartItemDisplay from '../components/ShoppingCart/CartItemDisplay'

const ShoppingCartPage = () => {
    return (
        <div className='flex h-screen'>
            <Link 
                to='/products'
                className='absolute'
            >
                Back To Shopping
            </Link>

            <CartItemDisplay className='w-9/12 bg-off-white p-32 font-header text-dark-brown'/>
            <div className='w-3/12 bg-dark-brown'>
                hi
            </div>
        </div>
    )
}

export default ShoppingCartPage
