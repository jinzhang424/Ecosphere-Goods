import React from 'react'
import db, { getDocs, collection, query, where } from '../firebase'
import { useLoaderData } from 'react-router-dom'

const productLoader = async ({ params }) => {
    const { productName } = params;
    const productCollection = collection(db, 'products');
    const productQuery = query(productCollection, where('name', '==', productName));
    const productSnap = await getDocs(productQuery);
    const productData = productSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return productData[0];
};



const ProductPage = () => {
    const fillerText = 'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum '
    const product = useLoaderData()

    return (
        <div className='pt-32'>
            <div className='flex p-16 space-x-8'>
                <img 
                    className='w-5/12 object-cover object-center h-5/6 rounded-3xl'
                    src={ product.images[0]} 
                    alt="" 
                />
                <div className='flex flex-col justify-between'>
                    <article>
                        <h1 className='font-LHeader text-header text-dark-brown'>{ product.name }</h1>
                        { product.description != null ? product.description : fillerText }
                    </article>
                    <div className='flex justify-between'>
                        <h2 className='font-LHeader text-sHeader text-dark-brown'>$10.00</h2>
                        <button className='bg-off-white p-2 pl-4 pr-4 rounded-xl font-header text-dark-brown'>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export {ProductPage as default, productLoader}