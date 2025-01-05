import React from 'react'
import unitToDollarString from '../utilityFunctions/unitToDollarString'

const LowLevelProductView = ({ product }) => {
    const fillerText = 'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum '

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
                        <button className='bg-light-brown p-2 pl-4 pr-4 rounded-xl font-header text-dark-brown bg-opacity-50'>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LowLevelProductView
