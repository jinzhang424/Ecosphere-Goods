import React, { useState, useEffect } from 'react'
import db, { collection, query, where, getDocs, orderBy } from '../../firebase';
import SortByAndAppliedFilters from './SortByAndAppliedFilters'
import ProductDisplay from '../ProductDisplay'
import ProductFilter from './ProductFilter'
import PriceFilter from './PriceFilter'

const FilterAndDisplay = () => {
    const [products, setProducts] = useState([])
    const [filters, setFilters] = useState([])
    const [minUnitCost, setMinUnitCost] = useState(0)
    const [maxUnitCost, setMaxUnitCost] = useState(30000)
    const [sortByVal, setSortByVal] = useState('Newest')

    useEffect(() => {
      const fetchProducts = async () => {
        const productsRef = collection(db, 'products')
        let queryConditions = [where('active', '==', true)];

        if (filters.length > 0) {
          queryConditions.push(where('metadata.itemCategory', 'in', filters));
        }
          
        console.log('fetching')
        if (sortByVal === 'Oldest') {
            queryConditions.push(orderBy('date_created', 'desc'));
        }
        else if (sortByVal ==='Oldest') {
            queryConditions.push(orderBy('date_created', 'asc'));
        }
          
        const q = query(productsRef, ...queryConditions)
        const querySnapShot = await getDocs(q);
        const products = [];
        
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
              products.push({ id: productDoc.id, ...productData});
          }
        });
      
        await Promise.all(productPromises);

        if (sortByVal === 'Price: Low to High') {
          products.sort((a, b) => a.prices[0].priceData.unit_amount - b.prices[0].priceData.unit_amount);
        } else if (sortByVal === 'Price: High to Low') {
          products.sort((a, b) => b.prices[0].priceData.unit_amount - a.prices[0].priceData.unit_amount);
        }

        setProducts(products);
      }
      
      fetchProducts()
    }, [filters, maxUnitCost, minUnitCost, sortByVal])
    return (
        <div className="flex p-12 pt-32">
            <div className="p-8 w-1/4 rounded-2xl border-4 border-dark-brown border-opacity-80">
                <h1 className='font-LHeader text-dark-brown text-sHeader pb-8'>Filter Products</h1>
                <ProductFilter setFilters={ setFilters }/>
                <PriceFilter setMinCost={ setMinUnitCost } setMaxCost={ setMaxUnitCost }/>
            </div>
            
            <div className='pl-8 w-3/4'>
                <SortByAndAppliedFilters filters={ filters } setSortByVal={ setSortByVal }/>
                <div className='pt-8 h-screen'>
                <ProductDisplay products={ products }/>
                </div>
            </div>
        </div>
    )
}

export default FilterAndDisplay
