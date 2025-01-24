import React from 'react'
import { useSelector } from 'react-redux'
import { selectCartSubtotal, selectCart } from '../../features/shoppingCartSlice'
import unitToDollarString from '../../utilityFunctions/unitToDollarString'
import { selectUser } from '../../features/userSlice'
import db from '../../firebase'
import { ToastContainer, toast } from 'react-toastify'
import { doc, collection, addDoc, onSnapshot } from '../../firebase'
import { loadStripe } from '@stripe/stripe-js';

const FinalPricingInformation = () => {
    const subTotal = useSelector(selectCartSubtotal);
    const cartItems = useSelector(selectCart);
    const user = useSelector(selectUser)

    const loadCheckout = async () => {
        try {
            let customerDocRef;
            if (user) {
                customerDocRef = doc(db, 'customers', user.uid);
            } else {
                toast.error('You must be signed in before checking out')
                return
            }

            const orderRef = collection(customerDocRef, 'checkout_sessions');

            const lineItems = cartItems.map(item => ({
                price: item.product.prices[0].priceId,
                quantity: item.quantity,
            }));

            const docRef = await addDoc(orderRef, {
                mode: 'payment',
                products: cartItems,
                line_items: lineItems,
                success_url: window.location.origin,
                cancel_url: window.location.origin,
                order_status: 'Pending'
            })

            onSnapshot(
                doc(db, 'customers', user.uid, 'checkout_sessions', docRef.id), async(snap) => {
                    const { error, sessionId } = snap.data();

                    console.log(snap.data())
                    
                    if (error) {
                        console.log(error)
                        toast.error('An unexpected error has occurred.')
                    }

                    if (sessionId) {
                        const stripe = await loadStripe("pk_test_51QbDQdE7piTFR3g09Nfa4RMahLOWE8dvS8WOJh3aJ4bfTXm2ybKtoWlC9FPu5QFcbF9ki7v0iSI9ndHZb38XDLSU00lVgKJ8hI")
                        stripe.redirectToCheckout({ sessionId })
                    }
                }
            )
        } catch (error) {
            toast.error('An unexpected error has occurred')
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

            <ToastContainer/>
        </div>
    )
}

export default FinalPricingInformation
