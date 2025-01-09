import React, { useState } from 'react'
import unitToDollarString from '../utilityFunctions/unitToDollarString'
import { addItem } from '../features/shoppingCartSlice'
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';

const LowLevelProductView = ({ product }) => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    const fillerText = 'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum '

    const handleAddToCart = (e) => {
        setLoading(true)
        try {
            const serializableProduct = {
                ...product,
                date_created: product.date_created.toDate().toISOString(), // Convert Timestamp to ISO string
            };
            dispatch(addItem(serializableProduct));
            toast.success('Successfully Added to Cart');
        } catch (error) {
            toast.error('Error, something has gone wrong.');
        } finally {
            setLoading(false);
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
                    
                    <div className='flex justify-between'>
                        <h2 className='font-LHeader text-sHeader text-dark-brown'>{ unitToDollarString(product.prices[0].priceData.unit_amount) }</h2>
                        <button 
                            className='relative bg-light-brown p-2 pl-4 pr-4 rounded-xl font-header text-dark-brown bg-opacity-50 flex items-center justify-center hover:scale-105 transition-transform ease-in-out duration-300'
                            onClick={ handleAddToCart }
                            disabled={loading}
                        >
                            {loading && (
                                <CircularProgress size={20} className="absolute" color='#E9E1DE'/>
                            )}
                            <span className={`${loading ? 'opacity-0' : 'opacity-100'}`}>Add to Cart</span>
                        </button>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default LowLevelProductView
