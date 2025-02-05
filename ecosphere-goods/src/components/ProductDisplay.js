import React, { useEffect, useState } from 'react'
import ShoppingProductDialog from './ShoppingProductDialog'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const ProductDisplay = ({ products }) => {
    console.log('prodcut display products:', products)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [productsOnpage, setProductsOnPage] = useState(products.slice(0, 6))

    useEffect(() => {
        const pages = Math.ceil(products.length / 6);
        setTotalPages(pages);
        setProductsOnPage(products.slice((page - 1) * 6, page * 6))
    }, [page, products])

    console.log('Max pages', totalPages)

    return (
        <div className='flex flex-col flex-wrap pt-6 pl-6'>
            <div className='flex flex-wrap'>
                {Object.entries(productsOnpage).map(([productId, productData]) => (
                    <div className='w-80 mb-8 pr-8' key={ productId } >
                        <ShoppingProductDialog productData={productData}/>
                    </div>
                ))}
            </div>

            <span className='flex w-full justify-end gap-3 max-h-8 text-dark-brown'>
                <button 
                    className={`bg-dark-brown bg-opacity-30 p-2 rounded-md ${page === 1 ? 'bg-gray-500 text-gray-700' : 'hover:scale-110 transition-transform ease-in-out duration-200'}`} 
                    onClick={() => setPage(page - 1)} 
                    disabled={page === 1} 
                >
                    <FaChevronLeft className='max-h-8 max-w-8 w-full h-full'/>
                </button>

                {Array.from({ length: totalPages}).map((_, index) => (
                    <button
                        key={index}
                        className={`bg-dark-brown bg-opacity-30 rounded-md aspect-square font-header text-subtitle text-center max-h-8 max-w-8 w-full h-full ${page === index + 1 ? 'scale-110' : 'hover:scale-110 transition-transform ease-in-out duration-200'}`}
                        onClick={() => setPage(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}

                <button 
                    className={`bg-dark-brown bg-opacity-30 p-2 rounded-md ${page === totalPages && 'bg-gray-500 text-gray-700'} hover:scale-110 transition-transform ease-in-out duration-200`} 
                    onClick={() => setPage(page + 1)} 
                    disabled={page === totalPages}
                >
                    <FaChevronRight className='max-h-8 max-w-8 w-full h-full'/>
                </button>
            </span>
        </div>
    )
}

export default ProductDisplay
