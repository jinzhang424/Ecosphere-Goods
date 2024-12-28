import React from 'react'
import ProductFilter from '../components/ProductFilter'
import PriceFilter from '../components/PriceFilter'
import SaleBanner from '../components/SaleBanner'

const ProductsPage = () => {
  return (
    <div className='bg-off-white border-b-2 border-dark-brown border-opacity-50'>
      <SaleBanner/>
      
      <div className="p-12 pt-32">
        <div className="p-8 w-1/4 rounded-2xl border-4 border-dark-brown border-opacity-80">
          <h1 className='font-LHeader text-dark-brown text-sHeader pb-8'>Filter Products</h1>
          <ProductFilter/>
          <PriceFilter/>
        </div>
      </div>
    </div>
  )
}

export default ProductsPage
