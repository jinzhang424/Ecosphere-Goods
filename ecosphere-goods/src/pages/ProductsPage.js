import React from 'react'
import ProductFilter from '../components/Filter/ProductFilter'
import PriceFilter from '../components/Filter/PriceFilter'
import SaleBanner from '../components/SaleBanner'
import SortByAndAppliedFilters from '../components/Filter/SortByAndAppliedFilters'
import ProductDisplay from '../components/ProductDisplay'

const ProductsPage = () => {
  return (
    <div className='bg-off-white border-b-2 border-dark-brown border-opacity-50'>
      <SaleBanner/>
      
      <div className="flex p-12 pt-32">
        <div className="p-8 w-1/4 rounded-2xl border-4 border-dark-brown border-opacity-80">
          <h1 className='font-LHeader text-dark-brown text-sHeader pb-8'>Filter Products</h1>
          <ProductFilter/>
          <PriceFilter/>
        </div>
        
        <div className='pl-8 w-3/4'>
          <SortByAndAppliedFilters/>
          <div className='pt-8 h-screen'>
            <ProductDisplay/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsPage
