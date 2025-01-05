import React, { useState, useEffect } from 'react'
import db, { getDocs, collection, query, where } from '../firebase'
import { useLoaderData } from 'react-router-dom'
import SimilarProductsDisplay from '../components/SimilarProductsDisplay'
import HighLevelProductView from '../components/HighLevelProductView'

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
    const product = useLoaderData()
    const [similarProducts, setSimilarProducts] = useState([]);

    useEffect(() => {
        const loadSimilarProducts = async () => {
            const products = await fetchSimilarProducts(product.metadata.itemCategory, product.id);
            setSimilarProducts(products);
        };

        loadSimilarProducts();

    }, [product]);

    console.log(similarProducts)

    return (
        <div className='pt-48 p-32 bg-dark-brown'>

            <div className='bg-off-white rounded-3xl'>
                <HighLevelProductView product={ product }/>

                <div className='p-12 pt-0'>
                    <div className='border-t-2 border-dark-brown border-opacity-40 p-4 pt-12'>
                        <h1 className='text-dark-brown font-LHeader text-header'>Similar Products</h1>
                        <SimilarProductsDisplay 
                            data={ similarProducts } 
                            nextButtonClass='similar-next' 
                            prevButtonClass='similar-prev'
                        />
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export {ProductPage as default, productLoader}