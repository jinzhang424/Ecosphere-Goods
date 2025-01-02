import React, { useState, useEffect } from 'react'
import { collection, query, where, getDocs } from '../firebase';
import Item from './Item'
import db from '../firebase'

const ProductDisplay = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            const productsRef = collection(db, 'products')
            const q = query(productsRef, where('active', '==', true))
            const querySnapShot = await getDocs(q);
            const products = {};

            const productPromises = querySnapShot.docs.map(async (productDoc) => {
                const productData = productDoc.data();
                const priceSnap = await getDocs(collection(productDoc.ref, 'prices'));
        
                const prices = priceSnap.docs.map((price) => ({
                  priceId: price.id,
                  priceData: price.data(),
                }));
        
                productData.prices = prices;
                products[productDoc.id] = productData;
              });
        
              await Promise.all(productPromises);
              setProducts(products);
        }

        fetchProducts()
    }, [])

    useEffect(() => {
        Object.entries(products).forEach(([productId, productData]) => {
            console.log(`Product Prices: ${productData.prices[0].priceData.unit_amount}`);
        });
    }, [products]);

    console.log(products)


    return (
        <div className='flex flex-wrap overflow-y-scroll justify-between h-full'>
            {Object.entries(products).map(([productId, productData]) => (
                <div className='w-80 mb-8 pr-8' key={ productId } >
                    <Item  
                        imageUrl={ productData.images[0] } 
                        price={ productData.prices[0].priceData.unit_amount / 100 } 
                        name={ productData.name }
                    />
                </div>
            ))}
        </div>
    )
}

export default ProductDisplay
