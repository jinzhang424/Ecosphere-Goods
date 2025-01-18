const { db } = require('../config/firebase.js')
const { getDocs, collection, query, orderBy } = require('firebase/firestore');

// Gets the snapshot while filtering and ordering products
const getSnapshot = async (filters = [], order) => {
    const productsRef = db.collection('prducts')

    let productsQuery = productsRef.where('active', '==', true)
    if (filters.length > 0) {
        productsQuery = productsQuery.where('metadata.itemCategory', 'in', filters)
    }
    orderByDateCreated(productsQuery)

    const snapshot = await productsQuery.get()

    return snapshot
}

// Adding conditions to order by creation date if order is based on creation date
const orderByDateCreated = (productQuery, order) => {
    if (order === 'Newest') {
        productQuery.orderBy('date_created', 'desc');
    }
    else if (order ==='Oldest') {
        productQuery.orderBy('date_created', 'asc');
    }
}

// Sorts products by price if order is based on price
const sortByPrice = (products, order) => {
    if (order === 'Price: Low to High') {
        products.sort((a, b) => a.prices[0].priceData.unit_amount - b.prices[0].priceData.unit_amount);
    } else if (order === 'Price: High to Low') {
        products.sort((a, b) => b.prices[0].priceData.unit_amount - a.prices[0].priceData.unit_amount);
    }
}

const fetchProducts = async (snapshot, minUnitCost, maxUnitCost) => {

    const products = [];
    const productPromises = snapshot.docs.map(async (doc) => {
        const productData = doc.data()
        const priceSnap = await getDocs(collection(doc.ref, 'prices'))
        
        const prices = priceSnap.forEach((price) => ({
            priceId: price.id,
            priceData: price.data(),
        }))
        const unitCost = prices[0]?.priceData.unit_amount;

        if (minUnitCost <= unitCost && unitCost <= maxUnitCost) {
            productData.prices = prices
            products.push({id: doc.id, ...productData})   
        }
    })

    await Promise.all(productPromises)
    return products
}

const getProducts = async (req, res) => {
    const { minUnitCost, maxUnitCost } = req.unitCostRange
    const { filters } = req.filters
    const { order } = req.order

    try {
        const snapshot = getSnapshot(filters)
        if (snapshot.empty) {
            return res.status(404).json({ success: false, message: 'Products not found'})
        }
        
        const products = fetchProducts(snapshot, minUnitCost, maxUnitCost)

        // Sorting by price if needed
        sortByPrice(products, order)

        return res.status(200).json({ success: true, data: products})
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error fetching products'})
    }
}

module.exports = { getProducts }