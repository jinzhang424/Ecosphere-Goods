import React from 'react'
import ProductCatalogDisplay from './ProductCatalogDisplay'
import ProductDialog from './ProductDialog'
import { ProductCatalogProvider } from './ProductCatalogContext'

const AdminProductCatalog = () => {

  return (
    <ProductCatalogProvider>
      <div className='space-y-8 bg-off-white w-full h-fit rounded-3xl text-dark-brown p-8 pr-12 pl-12'>
        <div className='flex w-full justify-between items-center'>
          <h1 className='text-header font-header'>Product Catalog</h1>
          <ProductDialog>
            <span className='bg-dark-brown rounded-lg text-off-white h-fit p-2 pl-3 pr-3 font-header tracking-wide hover:bg-opacity-85 transition-all ease-in-out duration-100'>New Product</span>
          </ProductDialog>
        </div>

        <span className='flex font-header opacity-80 w-full justify-between pr-4 border-b-2 border-dark-brown border-opacity-70 pb-4'>
          <p className='text-center w-16'>Image</p>
          <p className='text-center w-48'>Name</p>
          <p className='text-center w-24'>Date Added</p>
          <p className='text-center w-24'>Category</p>
          <p className='text-center w-24'>Price</p>
          <span className='w-5'/>
        </span>

        <div className='h-fit'>
          <ProductCatalogDisplay />
        </div>
      </div>
    </ProductCatalogProvider>  
  )
}

export default AdminProductCatalog
