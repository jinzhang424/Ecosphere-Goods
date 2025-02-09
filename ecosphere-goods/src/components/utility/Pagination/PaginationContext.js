import { createContext, useEffect, useState } from "react";
import { seperateToPages } from "../../../utilityFunctions/seperateToPages";
import React from 'react'

export const PaginationContext = createContext()

const PaginationProvider = ({ children }) => {
    const [items, setItems] = useState([])
    const [curPage, setCurPage] = useState(1)
    const [itemsOnPage, setItemsOnPage] = useState([])
    const [loadingItemsOnPage, setLoadingItemsOnPage] = useState(true)
    const [totalPages, setTotalPages] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(1)


    useEffect(() => {
        if (items.length !== 0) {
            const pages = Math.ceil(items.length / itemsPerPage)
            setTotalPages(pages)
            
            setItemsOnPage(seperateToPages(itemsPerPage, items, pages))
            setLoadingItemsOnPage(false)
        }
    }, [items, itemsPerPage])

    return (
        <PaginationContext.Provider
            value={{
                items, setItems,
                curPage, setCurPage,
                itemsOnPage, setItemsOnPage,
                loadingItemsOnPage, setLoadingItemsOnPage,
                totalPages, setTotalPages,
                itemsPerPage, setItemsPerPage
            }}
        >
            { children }
        </PaginationContext.Provider>
    )
}

export default PaginationProvider
