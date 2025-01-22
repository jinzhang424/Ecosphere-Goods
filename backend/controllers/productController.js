const { db } = require('../config/firebase.js')
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Ensure you have your Stripe secret key in your environment variables

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
    const hasPriceRange = minUnitCost && maxUnitCost

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
        const snapshot = await getSnapshot(filters, order)
        if (snapshot.empty) {
            console.log('Snapshot was empty. This could be an error, or there were simply no items in the category.')
        }
        
        const products = await getProducts(snapshot, minUnitCost, maxUnitCost)
        sortByPrice(products, order)

        return res.status(200).json({ success: true, data: products})
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({ success: false, message: 'Error fetching products'})
    }
}

const addNewProduct = async (req, res) => {
    const { name, price, subcategory, image } = req.body;

    if (!name || !price || !subcategory || !image) {
        res.status(400).json({ success: false, message: 'All fields are required.'})
    }

    try {
        const stripeProduct = await stripe.products.create({
            name,
            images: [image],
            metadata: {
                itemCategory: category,
                itemSubcategory: subcategory,
            }
        })

        const stripePrice = await stripe.prices.create({
            unit_amount: price * 100,
            currency: 'nzd',
            product: stripeProduct.id
        })

        const newProductId = stripeProduct.id
        await db.collection('products').doc(newProductId).update({ date_created: new Date() })

        return res.status(201).json({ success: true, message: 'Product added successfully', stripeProduct, price: stripePrice})
    } catch (error) {
        console.error('Error adding product:', error);
        return res.status(500).json({ success: false, message: 'Error adding product' });
    }
}

const deletePrices = async (productId) => {
    try {
        const prices = await stripe.prices.list({ product: productId })

        for (const price of prices.data) {
            await stripe.prices.update(price.id, { active: false })
        }
    } catch (error) {
        throw new Error(error.message || 'Error deleting stripe prices')
    }
}

const deleteProduct = async (req, res) => {
    const { productId } = req.body

    if (!productId) {
        return res.status(400).json({ success: false, message: 'A product ID is required'})
    }

    try {
        await deletePrices(productId)
        await stripe.products.update(productId, { active: false });
        await db.collection('products').doc(productId).delete()

        return res.status(201).json({ success: true, message: 'Product Successfully deleted'})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success: false, message: 'Error deleting product'})
    }
} 

const updateProduct = async (req, res) => {
    const { name, imgUrl, price, category, subcategory, productId, priceId } = req.body 

    if (!name || !imgUrl || !price || !category || !subcategory) {
        console.error('There were missing parameters in the input')
        return res.status(400).json({ success: false, message: 'Missing paramters!'})
    }

    try {
        await stripe.products.update(productId, {
            name,
            images: [imgUrl],
            metadata: {
                itemCategory: category,
                itemSubcategory: subcategory
            }
        })

        await stripe.prices.update(priceId, {
            unit_amount: price * 100
        })

        return res.status(201).json({ success: true, message: 'Successfully updated product'})
    } catch (error) {
        console.log(error.message)
        return res.status(500).sjon({ success: false, message: 'Error occurred while updating product'})
    }
}

module.exports = { fetchProducts, addNewProduct, deleteProduct, updateProduct }