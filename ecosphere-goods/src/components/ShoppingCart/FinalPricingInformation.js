import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCartSubtotal, selectCart } from '../../features/shoppingCartSlice'
import unitToDollarString from '../../utilityFunctions/unitToDollarString'
import { selectUser } from '../../features/userSlice'
import { ToastContainer, toast } from 'react-toastify'
import { loadStripe } from '@stripe/stripe-js';
import { fetchCheckoutSessionID } from '../../utilityFunctions/checkoutHandling'
import DeliveryAddressDialog from './DeliveryAddressDialog'

const FinalPricingInformation = () => {
    const subTotal = useSelector(selectCartSubtotal);
    const cartItems = useSelector(selectCart);
    const user = useSelector(selectUser)
    const [openDialog, setOpenDialog] = useState(false)

    const closeDialog = () => {
        setOpenDialog(false)
    }

    const loadCheckout = async () => {
        if (!user.deliveryAddress) {
            setOpenDialog(true)
            return
        }

        try {
            const successUrl = 'http://localhost:3000/'
            const cancelUrl = 'http://localhost:3000/shopping-cart'
            const sessionID = await  fetchCheckoutSessionID(user.uid, cartItems, successUrl, cancelUrl, subTotal)
            
            const stripe = await loadStripe("pk_test_51QbDQdE7piTFR3g09Nfa4RMahLOWE8dvS8WOJh3aJ4bfTXm2ybKtoWlC9FPu5QFcbF9ki7v0iSI9ndHZb38XDLSU00lVgKJ8hI")
            stripe.redirectToCheckout({ sessionId: sessionID })
        } catch (error) {
            toast.error('Error occurred while redirecting you to checkout')
            console.error(error.message)
        }
    }

    return (
        <div className='h-full'>
            <div className='flex flex-col space justify-between h-full'>
                <div className='flex flex-col space-y-16'>
                <div className='border-3 w-9/12 border-dark-brown'/>

                    <div className='font-header text-dark-brown tracking-widest'>
                        <div className='flex space-x-8 items-center'>
                            <p className='text-subtitle opacity-80'>SUBTOTAL:</p>
                            <p className='text-sHeader'>{unitToDollarString(subTotal)}</p>
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
                        <p className='text-header'>{unitToDollarString(subTotal + 500)}</p>
                    </div>

                    <button 
                        className='p-3 pl-6 pr-6 rounded-full bg-dark-brown text-off-white tracking-3px hover:scale-105 transition-transform ease-in-out duration-300'
                        onClick={loadCheckout}
                    >
                        CHECKOUT
                    </button>
                </div>
            </div>

            <DeliveryAddressDialog open={openDialog} closeDialog={closeDialog}/>
            <ToastContainer/>
        </div>
    )
}

export default FinalPricingInformation
