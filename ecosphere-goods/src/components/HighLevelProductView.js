import React from 'react'

const HighLevelProductView = ({ product }) => {
    const fillerText = 'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum '

    return (
        <div className='w-full'>
            <div className='flex p-16 space-x-10'>
                <img 
                    className='w-5/12 object-cover object-center h-5/6 rounded-3xl'
                    src={ product.images[0] } 
                    alt="" 
                />
                <div className='flex flex-col justify-between border-l-2 border-opacity-40 border-dark-brown pl-8'>
                    <article className='flex flex-col space-y-2'>
                        <h1 className='font-LHeader text-header text-dark-brown'>{ product.name }</h1>
                        <p>{ product.description != null ? product.description : fillerText }</p>
                    </article>
                    <div className='flex justify-between'>
                        <h2 className='font-LHeader text-sHeader text-dark-brown'>${ product.prices[0].priceData.unit_amount / 100 }</h2>
                        <button className='bg-off-white p-2 pl-4 pr-4 rounded-xl font-header text-dark-brown'>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HighLevelProductView
