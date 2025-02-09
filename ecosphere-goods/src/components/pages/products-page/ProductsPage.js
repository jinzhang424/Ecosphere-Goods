import React from 'react'
import SaleBanner from './SaleBanner'
import FilterAndDisplay from '../../Filter/FilterAndDisplay'

const ProductsPage = () => {
  return (
    <div className='bg-off-white border-b-2 border-dark-brown border-opacity-50'>
      <SaleBanner/>
      <FilterAndDisplay/>
    </div>
  )
}

export default ProductsPage
