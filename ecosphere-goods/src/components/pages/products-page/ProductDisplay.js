import React, { useContext, useEffect } from 'react'
import ShoppingProductDialog from './ShoppingProductDialog'
import TruckComponentLoader from '../../animations/TruckComponentLoader';
import PaginationButtons from '../../utility/pagination/PaginationButtons';
import { PaginationContext } from '../../utility/pagination/PaginationContext';

const ProductDisplay = ({ products }) => {
    const { setItems, setItemsPerPage, itemsOnPage, curPage, loadingItemsOnPage, setLoadingItemsOnPage } = useContext(PaginationContext)

    useEffect(() => {
        setLoadingItemsOnPage(true)
        setItems(products)
        setItemsPerPage(8)
    }, [products, setItems, setItemsPerPage, setLoadingItemsOnPage])

    return (
        <div className='flex flex-col w-full h-full justify-between pb-8'>
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

            <PaginationButtons/>
        </div>
    )
}

export default ProductDisplay
