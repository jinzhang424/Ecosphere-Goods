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
    const product = useLoaderData()

    return (
        <div className='pt-96'>

        </div>
        
    )
}

export {ProductPage as default, productLoader}