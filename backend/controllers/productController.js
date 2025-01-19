const { db } = require('../config/firebase.js')
const { getDocs, collection } = require('firebase-admin/firestore')

// Gets the snapshot while filtering and ordering products
const getSnapshot = async (filters = [], order) => {
    try {
        const productsRef = db.collection('products')
        let productsQuery = productsRef.where('active', '==', true)

        if (filters.length > 0) {
            productsQuery = productsQuery.where('metadata.itemCategory', 'in', filters)
        }
        productsQuery = orderByDateCreated(productsQuery, order)
        const snapshot = await productsQuery.get();

        return snapshot
    } catch (error) {
        console.log(error.message)
        throw new Error('Error while getting snapshot')
    }
}

const orderByDateCreated = (productQuery, order) => {
    if (order === 'Newest') {
        return productQuery.orderBy('date_created', 'desc');
    } else if (order ==='Oldest') {
        return productQuery.orderBy('date_created', 'asc');
    }

    return productQuery
}

const sortByPrice = (products, order) => {
    if (order === 'Price: Low to High') {
        products.sort((a, b) => a.prices[0].priceData.unit_amount - b.prices[0].priceData.unit_amount);
    } else if (order === 'Price: High to Low') {
        products.sort((a, b) => b.prices[0].priceData.unit_amount - a.prices[0].priceData.unit_amount);
    }
}

const getProducts = async (snapshot, minUnitCost, maxUnitCost) => {

    const products = [];
    const hasPriceRange = !minUnitCost || !maxUnitCost

    const productPromises = snapshot.docs.map(async (doc) => {
        const productData = doc.data()
        const priceSnap = await doc.ref.collection('prices').get()
        
        const prices = priceSnap.docs.map((price) => ({
            priceId: price.id,
            priceData: price.data(),
        }))
        const unitCost = prices[0]?.priceData.unit_amount;

        if (!hasPriceRange) {
            productData.prices = prices
            products.push({id: doc.id, ...productData})   
        } else if (minUnitCost <= unitCost && unitCost <= maxUnitCost) {
            productData.prices = prices
            products.push({id: doc.id, ...productData})   
        }
    })

    await Promise.all(productPromises)
    return products
}

const fetchProducts = async (req, res) => {
    const { minUnitCost, maxUnitCost, filters = [], order } = req.query

    try {
        console.log('GETTING SNAPSHOT')
        const snapshot = await getSnapshot(filters, order)
        console.log('GOT SNAPSHOT')
        if (snapshot.empty) {
            return res.status(404).json({ success: false, message: 'Products not found'})
        }
        
        const products = await getProducts(snapshot, minUnitCost, maxUnitCost)
        sortByPrice(products, order)

        return res.status(200).json({ success: true, data: products})
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({ success: false, message: 'Error fetching products'})
    }
}

module.exports = { fetchProducts }