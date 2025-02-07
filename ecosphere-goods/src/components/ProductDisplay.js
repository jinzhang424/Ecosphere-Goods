import React, { useEffect, useState } from 'react'
import ShoppingProductDialog from './ShoppingProductDialog'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import TruckComponentLoader from './animations/TruckComponentLoader';
import PaginationArrowButton from './utility/PaginationArrowButton';
import PaginationNumberButtons from './utility/PaginationNumberButtons';
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import { seperateToPages } from '../utilityFunctions/seperateToPages';

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
            
            seperateToPages(productsPerPage, products, pages)

            setProductsOnPage(productsOnPage)
            setLoading(false)
        } 

        setProductsOnEachPage()
    }, [totalPages, products])

    return (
        <div className='flex flex-col flex-wrap w-full'>
            {/** Product Display or Loading */}
            {productsOnPage.length !== 0 ? (
                <div className='grid grid-cols-4 grid-rows-2 h-lvh gap-8'>
                    {Object.entries(productsOnPage[page - 1]).map(([productId, productData]) => (
                        <div className='max-w-64 flex-grow h-fit mt-6' key={ productId } >
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
            <span className={`flex w-full justify-end gap-3 mt-16 h-8 text-dark-brown ${productsOnPage.length === 0 && 'opacity-0'}`}>
                {/** First Page button */}
                <PaginationArrowButton
                    onClick={() => setPage(1)} 
                    disabled={page === 1}
                >
                    <FiChevronsLeft size={24}/>
                </PaginationArrowButton>

                {/** Previous Page button */}
                <PaginationArrowButton  
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1} 
                >
                    <FaChevronLeft size={16}/>
                </PaginationArrowButton>

                {/** Number buttons */}
                <PaginationNumberButtons 
                    totalPages={totalPages} 
                    setPage={setPage}
                    page={page}
                />

                {/** Next Page button */}
                <PaginationArrowButton 
                    onClick={() => setPage(page + 1)} 
                    disabled={page === totalPages}
                >
                    <FaChevronRight size={16}/>
                </PaginationArrowButton>

                {/** Last Page button */}
                <PaginationArrowButton
                    onClick={() => setPage(totalPages)} 
                    disabled={page === totalPages}
                >
                    <FiChevronsRight size={24}/>
                </PaginationArrowButton>
            </span>
        </div>
    )
}

export default ProductDisplay
