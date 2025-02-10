import React, { useContext, useEffect } from 'react'
import ProductCatalogItem from './ProductCatalogItem'
import { ProductCatalogContext } from './ProductCatalogContext'
import TruckComponentLoader from '../../../animations/TruckComponentLoader'
import ProductInfoHeadings from '../ProductInfoHeadings'
import { PaginationContext } from '../../../utility/pagination/PaginationContext'
import PaginationButtons from '../../../utility/pagination/PaginationButtons'

const ProductCatalogDisplay = () => {
    const { products, loadingProducts } = useContext(ProductCatalogContext)
    const { setItems, itemsOnPage, curPage, itemsPerPage, setItemsPerPage, loadingItemsOnPage } = useContext(PaginationContext)

    useEffect(() => {
        setItemsPerPage(7)

        if (products.length !== 0) {
            console.log("Setting Items")
            setItems(products)
        }
    }, [products, setItems, setItemsPerPage])

    return (
        <>
            { loadingProducts || loadingItemsOnPage ? (
                <div className='relative top-12'><TruckComponentLoader loading={ loadingItemsOnPage }/></div>
            ) : (
                <>
                    <ProductInfoHeadings/>

                    <div className={`grid grid-rows-${itemsPerPage} gap-4`}>
                        {Object.entries(itemsOnPage[curPage - 1])?.map(([productId, productData]) => (
                            <div key={ productId }>
                                <ProductCatalogItem key={ productId } productData={ productData }/>
                            </div>
                        ))}
                    </div>

                    <PaginationButtons/>
                </>
            )}

            
        </>
    )
}

export default ProductCatalogDisplay
