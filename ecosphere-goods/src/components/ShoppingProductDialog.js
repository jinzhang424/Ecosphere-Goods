import React, { useState } from 'react'
import unitToDollarString from '../utilityFunctions/unitToDollarString'
import { addItemBulk } from '../features/shoppingCartSlice'
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import QuantityAdjuster from './utility/QuantityAdjuster';
import AddToCartButton from './utility/AddToCartButton';
import Item from './Item';

const ShoppingProductDialog = ({ productData }) => {
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(1)
    const fillerText = 'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum '
    const [open, setOpen] = useState(false)

    const handleIncrement = () => {
        setQuantity(quantity + 1)
    }

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    const handleAddToCart = () => {
        try {
            dispatch(addItemBulk({ product: productData, quantity: quantity }));
            toast.success('Successfully Added to Cart');
        } catch (error) {
            toast.error('Error, something has gone wrong.');
            console.log(error)
        } finally {
        }
    }

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <div>
            <button onClick={handleOpen}>
                <Item productData={productData}/>
            </button>

            <div className={`opacity-0 ${open ? 'opacity-100' : 'pointer-events-none'} transition-opacity ease-in-out duration-300`}>
                <div className='fixed inset-0 bg-black bg-opacity-50 z-10' onClick={handleClose}/>
                <dialog open className='fixed inset-0 w-2/3 flex p-20 space-x-48 bg-off-white rounded-3xl z-10'>
                    <img 
                        className='w-5/12 object-cover object-center h-5/6 rounded-3xl aspect-1/1 border-4 border-dark-brown border-opacity-50'
                        src={ productData.images[0] } 
                        alt="" 
                    />
                    <div className='flex flex-col space-y-12'>
                        <article className='flex flex-col space-y-4'>
                            <h1 className='font-LHeader text-header text-dark-brown underline underline-offset-4'>{ productData.name }</h1>
                            <p>{ productData.description != null ? productData.description : fillerText }</p>
                        </article>
                        
                        <div className='flex justify-between items-center'>
                            <h2 className='font-LHeader text-sHeader text-dark-brown'>{ unitToDollarString(productData.prices[0].priceData.unit_amount) }</h2>
                            <QuantityAdjuster 
                                increment={ handleIncrement } 
                                decrement={ handleDecrement } 
                                quantity={ quantity } 
                                className='rounded-md bg-dark-brown overflow-hidden bg-opacity-30 h-fit'
                            />
                            <AddToCartButton onClick={handleAddToCart}>
                                Add To Cart
                            </AddToCartButton>
                        </div>
                    </div>
                    <ToastContainer/>
                </dialog>
            </div>
        </div>
    )
}

export default ShoppingProductDialog
