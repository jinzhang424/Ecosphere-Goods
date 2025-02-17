const { db } = require('../config/firebase')
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const updateCategoricalSales = async (monthlySalesData, products, monthlySalesDoc) => {
    console.log('*** Updating monthly categorical sales ***')

    let categoryToSales = {}

    if (monthlySalesData.categoryToSales !== undefined) {
        categoryToSales = monthlySalesData.categoryToSales

        products.forEach((product) => {
            const category = product.category
            if (categoryToSales[category]) {
                categoryToSales[category] += product.quantity
            } else {
                categoryToSales[category] = product.quantity
            }
        })
    } else {
        products.forEach((product) => {
            const category = product.category
            categoryToSales[category] = product.quantity
        })
    }

    await monthlySalesDoc.update({
        categoryToSales: categoryToSales
    });
}

const updateProductSales = async (monthlySalesData, products, monthlySalesDoc) => {
    console.log('*** Updating monthly product sales ***')

    let productsToSales = {}

    if (monthlySalesData.productsToSales !== undefined) {
        productsToSales = monthlySalesData.productsToSales;

        products.forEach((product) => {
            const productId = product.id;
            if (productsToSales[productId]) {
                productsToSales[productId] += product.quantity 
            } else {
                productsToSales[productId] = product.quantity
            }
        })
    } else {
        products.forEach((product) => {
            const productId = product.id
            productsToSales[productId] = product.quantity
        })
    }

    await monthlySalesDoc.update({
        productsToSales: productsToSales
    })
}

const updateMonthlySalesData = async (req, res) => {
    console.log('*** Updating monthly sales data ***')

    try {
        const event = req.body
        const paymentIntent = event.data.object;

        if (event.type !== 'checkout.session.completed' || paymentIntent.payment_status !== 'paid') {
            console.error('User did not pay or the request did not have checkout.session.completed.')
            console.error('Event Type: ', event.type, 'Payment Status: ', paymentIntent.payment_status)
            return res.status(400).json({ success: false, message: 'User did not pay or the request did not have checkout.session.completed.'})
        }
        
        const products = JSON.parse(paymentIntent.metadata.products)
        const date = new Date()
        const month = (date.getMonth() + 1).toString().padStart(2, '0') 
        const yearAndMonth = `${date.getFullYear()}-${month}`

        console.log("YYYY/MM: ", yearAndMonth)

        const monthlySalesDoc = db.collection('monthly_sales_data').doc(yearAndMonth)
        const monhtlySalesSnap = await monthlySalesDoc.get()
        const monthlySalesData = monhtlySalesSnap.data()

        await updateCategoricalSales(monthlySalesData, products, monthlySalesDoc)
        await updateProductSales(monthlySalesData, products, monthlySalesDoc)

        return res.status(201).json({ success: true, message: 'Successfully updated monthly sales data'})
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = { updateMonthlySalesData }