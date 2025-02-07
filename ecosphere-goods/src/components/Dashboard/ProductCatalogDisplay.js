import React, { useContext, useEffect, useState } from 'react'
import ProductCatalogItem from './ProductCatalogItem'
import { ProductCatalogContext } from './ProductCatalogContext'
import { seperateToPages } from '../../utilityFunctions/seperateToPages'
import TruckComponentLoader from '../animations/TruckComponentLoader'
import PaginationNumberButtons from '../utility/PaginationNumberButtons'
import PaginationArrowButton from '../utility/PaginationArrowButton'
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import ProductInfoHeadings from './ProductInfoHeadings'

const ProductCatalogDisplay = () => {
    const { products, loadingProducts } = useContext(ProductCatalogContext)
    const [totalPages, setTotalPages] = useState(1)
    const [productsOnPage, setProductsOnPage] = useState([])
    const [curPage, setCurPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const productsPerPage = 7;

    console.log(products)

    useEffect(() => {
        if (products.length !== 0) {
            const pages = Math.ceil(products.length / productsPerPage)
            setTotalPages(pages)
            
            setProductsOnPage(seperateToPages(productsPerPage, products, pages))
            setLoading(false)
        }
    }, [products])

    console.log('LOOK HERE', productsOnPage)

    return (
        <>
            { loadingProducts || loading ? (
                <div className='relative'><TruckComponentLoader loading={loading}/></div>
            ) : (
                <>
                    <ProductInfoHeadings/>

                    <div className={`grid-rows-${productsPerPage} grid-rows-7 space-y-4`}>
                        {Object.entries(productsOnPage[curPage - 1])?.map(([productId, productData]) => (
                            <div key={ productId }>
                                <ProductCatalogItem key={ productId } productData={ productData }/>
                            </div>
                        ))}
                    </div>

                    <span className='flex justify-end gap-3'>
                        {/** First Page button */}
                        <PaginationArrowButton
                            onClick={() => setCurPage(1)} 
                            disabled={curPage === 1}
                        >
                            <FiChevronsLeft size={24}/>
                        </PaginationArrowButton>

                        {/** Previous Page button */}
                        <PaginationArrowButton  
                            onClick={() => setCurPage(curPage - 1)}
                            disabled={curPage === 1} 
                        >
                            <FaChevronLeft size={16}/>
                        </PaginationArrowButton>

                        <PaginationNumberButtons 
                            totalPages={totalPages} 
                            page={curPage} 
                            setPage={setCurPage}
                        />

                        {/** Next Page button */}
                        <PaginationArrowButton 
                            onClick={() => setCurPage(curPage + 1)} 
                            disabled={curPage === totalPages}
                        >
                            <FaChevronRight size={16}/>
                        </PaginationArrowButton>

                        {/** Last Page button */}
                        <PaginationArrowButton
                            onClick={() => setCurPage(totalPages)} 
                            disabled={curPage === totalPages}
                        >
                            <FiChevronsRight size={24}/>
                        </PaginationArrowButton>
                    </span>
                </>
            )}

            
        </>
    )
}

export default ProductCatalogDisplay
