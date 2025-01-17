import React, { useEffect, useState } from 'react'
import ProductCatalogItem from './ProductCatalogItem'
import { collection, query, where, getDocs } from '../../firebase'
import db from '../../firebase'

const ProductCatalogDisplay = () => {
    const [products, setProducts] = useState([])
    
    useEffect(() => {
        const fetchProducts = async () => {
            const productsRef = collection(db, 'products')
            const q = query(productsRef, where('active', '==', true))
            const qSnapShot = await getDocs(q)
            const products = []

            const productPromises = qSnapShot.docs.map(async (productDoc) => {
            const productData = productDoc.data()
            const priceSnap = await getDocs(collection(productDoc.ref, 'prices'));

            const prices = priceSnap.docs.map((price) => ({
                priceId: price.id,
                priceData: price.data()
            }))

            productData.prices = prices
            products.push({id: productDoc.id, ...productData})
            })

            await Promise.all(productPromises)
            setProducts(products)
        }

        fetchProducts()
    }, [])

    console.log(products)


    return (
        <div className='overflow-y-scroll h-full space-y-4'>
            {Object.entries(products).map(([productId, productData]) => (
                <ProductCatalogItem key={ productId } productData={ productData }/>
            ))}
        </div>
    )
}

export default ProductCatalogDisplay
