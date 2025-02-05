import React, { useState } from 'react'
import unitToDollarString from '../utilityFunctions/unitToDollarString'
import { addItemBulk } from '../features/shoppingCartSlice'
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import QuantityAdjuster from './utility/QuantityAdjuster';
import AddToCartButton from './utility/AddToCartButton';

const LowLevelProductView = ({ product }) => {
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(1)
    const fillerText = 'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum '

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
            dispatch(addItemBulk({ product: product, quantity: quantity }));
            toast.success('Successfully Added to Cart');
        } catch (error) {
            toast.error('Error, something has gone wrong.');
            console.log(error)
        } finally {
        }
    }

    return (
        <div className='w-full'>
            <div className='flex p-20 space-x-48 bg-off-white rounded-3xl'>
                <img 
                    className='w-5/12 object-cover object-center h-5/6 rounded-3xl aspect-1/1 border-4 border-dark-brown border-opacity-50'
                    src={ product.images[0] } 
                    alt="" 
                />
                <div className='flex flex-col space-y-12'>
                    <article className='flex flex-col space-y-4'>
                        <h1 className='font-LHeader text-header text-dark-brown underline underline-offset-4'>{ product.name }</h1>
                        <p>{ product.description != null ? product.description : fillerText }</p>
                    </article>
                    
                    <div className='flex justify-between items-center'>
                        <h2 className='font-LHeader text-sHeader text-dark-brown'>{ unitToDollarString(product.prices[0].priceData.unit_amount) }</h2>
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
            </div>
            <ToastContainer/>
        </div>
    )
}

export default LowLevelProductView
