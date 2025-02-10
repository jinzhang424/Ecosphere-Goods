import React from 'react'
import ProductCatalogDisplay from './ProductCatalogDisplay'
import ProductDialog from './product-handling/ProductDialog'
import { ProductCatalogProvider } from '../product-catalog/ProductCatalogContext'
import PaginationProvider from '../../../utility/pagination/PaginationContext'

const ProductCatalog = () => {

  return (
    <ProductCatalogProvider>
      <div className='space-y-8 bg-off-white w-full h-fit min-h-full rounded-3xl text-dark-brown p-8 pr-12 pl-12 transition-all duration-300 ease-in-out'>
        <div className='flex w-full justify-between items-center'>
          <h1 className='text-header font-header'>Product Catalog</h1>
          <ProductDialog>
            <span className='bg-dark-brown rounded-lg text-off-white h-fit p-2 pl-3 pr-3 font-header tracking-wide hover:bg-opacity-85 transition-all ease-in-out duration-100'>New Product</span>
          </ProductDialog>
        </div>

        <PaginationProvider>
          <ProductCatalogDisplay />
        </PaginationProvider>
      </div>
    </ProductCatalogProvider>
  )
}

export default ProductCatalog
