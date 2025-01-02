import React from 'react'
import SortByAndAppliedFilters from './SortByAndAppliedFilters'
import ProductDisplay from '../ProductDisplay'
import ProductFilter from './ProductFilter'
import PriceFilter from './PriceFilter'

const FilterAndDisplay = () => {
  return (
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
  )
}

export default FilterAndDisplay
