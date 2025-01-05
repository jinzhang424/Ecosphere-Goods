import React, { useState, useEffect } from 'react'
import db, { getDocs, collection, query, where } from '../firebase'
import { useLoaderData } from 'react-router-dom'

const productLoader = async ({ params }) => {
    const { productName } = params;
    const productCollection = collection(db, 'products');
    const productQuery = query(productCollection, where('name', '==', productName));
    const productSnap = await getDocs(productQuery);

    let product

    const productPromise = productSnap.docs.map(async (doc) => { 
        const productData = doc.data()
        const priceSnapShot = await getDocs(collection(doc.ref, 'prices'))
        
        const price = priceSnapShot.docs.map((price) => ({
            priceId: price.id,
            priceData: price.data()
        }))

        productData.prices = price;
        product = ({ id: doc.id, ...productData});
    });

    await Promise.all(productPromise);

    return product;
};

const fetchSimilarProducts = async (category, curProductId) => {
    const productCollection = collection(db, 'products')
    const productQuery = query(productCollection, where('metadata.itemCategory', '==', category))
    const productSnapShot = await getDocs(productQuery) 

    let similarProducts = []

    const productPromises = productSnapShot.docs.map(async (productDoc) => {
        if (productDoc.id !== curProductId) {
            const productData = productDoc.data();
            const priceSnap = await getDocs(collection(productDoc.ref, 'prices'));
      
            const prices = priceSnap.docs.map((price) => ({
              priceId: price.id,
              priceData: price.data(),
            }));
      
            productData.prices = prices;
            similarProducts.push({ id: productDoc.id, ...productData });
        }
    });

    await Promise.all(productPromises)
    return similarProducts
}

const ProductPage = () => {
    const fillerText = 'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum '
    const product = useLoaderData()
    const [similarProducts, setSimilarProducts] = useState([]);

    useEffect(() => {
        const loadSimilarProducts = async () => {
            const products = await fetchSimilarProducts(product.metadata.itemCategory, product.id);
            setSimilarProducts(products);
        };

        if (product) {
            loadSimilarProducts();
        }
    }, [product]);

    return (
        <div className='pt-32'>
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

            <div className='p-12 pt-0'>
                <div className='border-t-2 border-dark-brown border-opacity-40'>
                    {Object.entries(similarProducts).map(([productId, productData]) => (
                        <div key={ productId }>
                            {productData.name}
                        </div>
                    ))}
                </div>
            </div>
        </div>
        
    )
}

export {ProductPage as default, productLoader}