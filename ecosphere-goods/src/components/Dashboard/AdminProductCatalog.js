import { collection, query, where, getDocs } from '../../firebase'
import React, { useEffect, useState } from 'react'
import db from '../../firebase'

const AdminProductCatalog = () => {
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

  return (
    <div className='bg-off-white w-full h-full rounded-3xl'>
      
    </div>
  )
}

export default AdminProductCatalog
