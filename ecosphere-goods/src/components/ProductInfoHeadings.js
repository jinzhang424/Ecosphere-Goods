import React, { useContext } from 'react'
import { ProductCatalogContext } from './Dashboard/ProductCatalogContext'

const ProductInfoHeadings = () => {

    const { loadingProducts } = useContext(ProductCatalogContext)

  return (
    <span className={`flex font-header opacity-80 w-full justify-between pr-4 border-b-2 border-dark-brown border-opacity-70 pb-4 ${loadingProducts && 'opacity-0'} transition-opacity ease-in-out duration-300`}>
        <p className='text-center w-16'>Image</p>
        <p className='text-center w-48'>Name</p>
        <p className='text-center w-24'>Date Added</p>
        <p className='text-center w-24'>Category</p>
        <p className='text-center w-24'>Price</p>
        <span className='w-5'/>
    </span>
  )
}

export default ProductInfoHeadings
