import React from 'react'
import ProductCatalogDisplay from './ProductCatalogDisplay'

const AdminProductCatalog = () => {

  return (
    <div className='bg-off-white w-full h-full rounded-3xl text-dark-brown p-8'>
      <h1 className='text-header font-header'>Product Catalog</h1>
      
      <ProductCatalogDisplay />
    </div>
  )
}

export default AdminProductCatalog
