import React, { useState, useEffect } from 'react'
import SortByAndAppliedFilters from './SortByAndAppliedFilters'
import ProductDisplay from '../ProductDisplay'
import ProductFilter from './ProductFilter'
import PriceFilter from './PriceFilter'
import { fetchProducts } from '../../utilityFunctions/productHandling';
import PaginationProvider from '../PaginationContext'

const FilterAndDisplay = () => {
    const [products, setProducts] = useState([])
    const [filters, setFilters] = useState([])
    const [minUnitCost, setMinUnitCost] = useState(0)
    const [maxUnitCost, setMaxUnitCost] = useState(30000)
    const [sortByVal, setSortByVal] = useState('Newest')

    useEffect(() => {
      const fetchAndSetProducts = async () => {
        try {
          const products = await fetchProducts(filters, minUnitCost, maxUnitCost, sortByVal)
          setProducts(products)
        } catch (error) {
          console.error(error.message)
        }
      }

      fetchAndSetProducts()
    }, [filters, maxUnitCost, minUnitCost, sortByVal])

    return (
        <div className="flex p-12 pt-32">
            <div className="p-8 w-1/4 rounded-2xl border-4 border-dark-brown border-opacity-80">
                <h1 className='font-LHeader text-dark-brown text-sHeader pb-8'>Filter Products</h1>
                <ProductFilter setFilters={ setFilters }/>
                <PriceFilter setMinCost={ setMinUnitCost } setMaxCost={ setMaxUnitCost }/>
            </div>
            
            <div className='ml-8 w-3/4'>
                <SortByAndAppliedFilters filters={ filters } setSortByVal={ setSortByVal }/>
                <PaginationProvider>
                  <ProductDisplay products={ products }/>
                </PaginationProvider>
            </div>
        </div>
    )
}

export default FilterAndDisplay
