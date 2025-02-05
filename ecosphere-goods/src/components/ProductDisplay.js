import React, { useEffect, useState } from 'react'
import ShoppingProductDialog from './ShoppingProductDialog'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const ProductDisplay = ({ products }) => {
    console.log('prodcut display products:', products)
    const [page, setPage] = useState(1)
    const [productsOnpage, setProductsOnPage] = useState(products.slice(0, 6))

    const pages = Math.ceil(products.length / 6)

    useEffect(() => {
        setProductsOnPage(products.slice((page - 1) * 6, page * 6))
    }, [page])

    const prevPage = () => {
        setPage(page - 1)
    }

    const nextPage = () => {
        setPage(page + 1)
    }

    return (
        <div className='flex flex-col flex-wrap pt-6 pl-6'>
            <div className='flex flex-wrap'>
                {Object.entries(productsOnpage).map(([productId, productData]) => (
                    <div className='w-80 mb-8 pr-8' key={ productId } >
                        <ShoppingProductDialog productData={productData}/>
                    </div>
                ))}
            </div>

            <span className='flex w-full justify-end gap-3'>
                <button className='bg-dark-brown bg-opacity-30 p-1 rounded-md' onClick={prevPage} disabled={page === 1} >
                    <FaChevronLeft size={28}/>
                </button>
                <button className='bg-dark-brown bg-opacity-30 p-1 rounded-md' onClick={nextPage} disabled={page === pages}>
                    <FaChevronRight size={28}/>
                </button>
            </span>
        </div>
    )
}

export default ProductDisplay
