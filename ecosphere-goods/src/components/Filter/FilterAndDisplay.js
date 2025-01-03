import React, { useState, useEffect } from 'react'
import db, { collection, query, where, getDocs } from '../../firebase';
import SortByAndAppliedFilters from './SortByAndAppliedFilters'
import ProductDisplay from '../ProductDisplay'
import ProductFilter from './ProductFilter'
import PriceFilter from './PriceFilter'

const FilterAndDisplay = () => {
    const [products, setProducts] = useState([])
    const [filters, setFilters] = useState(new Set())
    const [minUnitCost, setMinUnitCost] = useState(0)
    const [maxUnitCost, setMaxUnitCost] = useState(300)

    useEffect(() => {
        const fetchProducts = async () => {
            const productsRef = collection(db, 'products')
            let queryConditions = [where('active', '==', true)];

            if (filters.size > 0) {
                const filtersArray = Array.from(filters)
                queryConditions.push(where('metaData.itemCategory', 'in', filtersArray))
            }

            const q = query(productsRef, queryConditions)
            
            const querySnapShot = await getDocs(q);
            const products = {};
            
            const productPromises = querySnapShot.docs.map(async (productDoc) => {
                const productData = productDoc.data();
                const priceSnap = await getDocs(collection(productDoc.ref, 'prices'));
        
                const prices = priceSnap.docs.map((price) => ({
                  priceId: price.id,
                  priceData: price.data(),
                }));

                const unitCost = prices[0]?.priceData.unit_amount;
                if (unitCost >= minUnitCost && unitCost <= maxUnitCost) {
                    productData.prices = prices;
                    products[productDoc.id] = productData;
                }
              });
        
              await Promise.all(productPromises);
              setProducts(products);
        }

        fetchProducts()
    }, [filters, maxUnitCost, minUnitCost])

    console.log('Min: ', minUnitCost, 'Max', maxUnitCost)

    return (
        <div className="flex p-12 pt-32">
            <div className="p-8 w-1/4 rounded-2xl border-4 border-dark-brown border-opacity-80">
                <h1 className='font-LHeader text-dark-brown text-sHeader pb-8'>Filter Products</h1>
                <ProductFilter setFilters={ setFilters }/>
                <PriceFilter setMinCost={ setMinUnitCost } setMaxCost={ setMaxUnitCost }/>
            </div>
            
            <div className='pl-8 w-3/4'>
                <SortByAndAppliedFilters/>
                <div className='pt-8 h-screen'>
                <ProductDisplay products={ products }/>
                </div>
            </div>
        </div>
    )
}

export default FilterAndDisplay
