import React, { useContext, useEffect } from 'react'
import ShoppingProductDialog from './ShoppingProductDialog'
import TruckComponentLoader from './animations/TruckComponentLoader';
import PaginationButtons from './utility/PaginationButtons';
import { PaginationContext } from './PaginationContext';

const ProductDisplay = ({ products }) => {
    const { setItems, setItemsPerPage, itemsOnPage, curPage, loadingItemsOnPage, setLoadingItemsOnPage } = useContext(PaginationContext)

    useEffect(() => {
        setLoadingItemsOnPage(true)
        setItems(products)
        setItemsPerPage(8)
    }, [products, setItems, setItemsPerPage])

    return (
        <div className='flex flex-col flex-wrap w-full'>
            {/** Product Display or Loading */}
            {loadingItemsOnPage || products.length === 0 ? (
                <div className='relative'>
                    <TruckComponentLoader loading={loadingItemsOnPage || products.length === 0}/>
                </div>
            ) : (
                <div className='grid grid-cols-4 grid-rows-2 h-lvh gap-8'>
                    {Object.entries(itemsOnPage[curPage - 1]).map(([productId, productData]) => (
                        <div className='max-w-64 flex-grow h-fit mt-6' key={ productId } >
                            <ShoppingProductDialog productData={productData}/>
                        </div>
                    ))}
                </div>
            )}

            <div className='mt-16'>
                <PaginationButtons/>
            </div>
        </div>
    )
}

export default ProductDisplay
