import React, { useEffect, useState } from 'react'
import ShoppingProductDialog from './ShoppingProductDialog'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import TruckComponentLoader from './animations/TruckComponentLoader';
import PaginationArrowButton from './utility/PaginationArrowButton';
import PaginationNumberButtons from './utility/PaginationNumberButtons';

const ProductDisplay = ({ products }) => {
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [productsOnPage, setProductsOnPage] = useState([])
    const [loading, setLoading] = useState(true)
    const productsPerPage = 8;

    useEffect(() => {
        const setProductsOnEachPage = () => {
            setLoading(true)
            const pages = Math.ceil(products.length / productsPerPage);
            setTotalPages(pages);
            
            const productsOnPage = []
            for (let i = 0; i < totalPages; i++) {
                productsOnPage.push(products.slice(i * productsPerPage, (i + 1) * productsPerPage))
            }

            setProductsOnPage(productsOnPage)
            setLoading(false)
        } 

        setProductsOnEachPage()
    }, [totalPages, products])

    return (
        <div className='flex flex-col flex-wrap pt-6 pl-6'>
            {/** Product Display or Loading */}
            {productsOnPage.length !== 0 ? (
                <div className='flex flex-wrap'>
                    {Object.entries(productsOnPage[page - 1]).map(([productId, productData]) => (
                        <div className='w-60 mb-8 pr-8' key={ productId } >
                            <ShoppingProductDialog productData={productData}/>
                        </div>
                    ))}
                </div>
            ) : (
                <div className='relative'>
                    <TruckComponentLoader loading={loading}/>
                </div>
            )}

            {/** Pagination Buttons */}
            <span className={`flex w-full justify-end gap-3 max-h-8 text-dark-brown ${productsOnPage.length === 0 && 'opacity-0'}`}>
                {/** Previous Page button */}
                <PaginationArrowButton  
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1} 
                >
                    <FaChevronLeft className='max-h-8 max-w-8 w-full h-full'/>
                </PaginationArrowButton>

                {/** Number buttons */}
                {Array.from({ length: totalPages }).map((_, index) => (
                    <PaginationNumberButtons 
                        totalPages={totalPages} 
                        onClick={() => setPage(index + 1)}
                        page={page}
                        index={index}
                    />
                ))}

                {/** Next Page button */}
                <PaginationArrowButton 
                    onClick={() => setPage(page + 1)} 
                    disabled={page === totalPages}
                >
                    <FaChevronRight className='max-h-8 max-w-8 w-full h-full'/>
                </PaginationArrowButton>
            </span>
        </div>
    )
}

export default ProductDisplay
