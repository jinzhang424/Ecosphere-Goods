import React from 'react'
import ProductCatalogDisplay from './ProductCatalogDisplay'

const AdminProductCatalog = () => {

  return (
    <div className='space-y-8 bg-off-white w-full h-full rounded-3xl text-dark-brown p-8 pr-12 pl-12'>
      <h1 className='text-header font-header'>Product Catalog</h1>

      <span className='flex font-header opacity-80 w-full justify-between pr-16 border-b-2 border-dark-brown border-opacity-70 pb-4'>
        <p className='text-center w-16'>Image</p>
        <p className='text-center w-48'>Name</p>
        <p className='text-center w-48'>Date Added</p>
        <p className='text-center w-48'>Category</p>
        <p className='text-center w-48'>Price</p>
      </span>

      <div className='h-4/6'>
        <ProductCatalogDisplay />
      </div>
    </div>
  )
}

export default AdminProductCatalog
