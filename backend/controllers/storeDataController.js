const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)
const { db, admin } = require('../config/firebase.js')
const { isAdmin } = require('./authController')

/**
 * This controller controls the general store data such as revenue, user traffic etc.
 */

/**
 * Gets the product to sales map of the current month
 * 
 * @returns product to sales map of the current month
 */
const getProductsToSalesMap = async () => {
    const date = new Date()
    const month = (date.getMonth() + 1).toString().padStart(2, '0') 
    const yearAndMonth = `${date.getFullYear()}-${month}`

    // Getting the product to sales map
    const curMonthSalesSnap = await db.collection('monthly_sales_data').doc(yearAndMonth).get()
    const productSalesData = curMonthSalesSnap.data()
    const productToSales = productSalesData?.productsToSales

    return productToSales;
}

const fetchMonthlyRevenueData = async (req, res) => {
    if (!isAdmin(req.user?.uid)) {
        console.log('Insufficient permissions.')
        return res.status(400).json({ successs: false, message: 'Insufficient permissions.'})
    }

    try {
        const today = new Date();
        const past30Days = new Date();
        past30Days.setDate(today.getDate() - 30)

        // Converting to unix timestamp
        const startDate = Math.floor(past30Days.getTime() / 1000)
        const endDate = Math.floor(today.getTime() / 1000)

        const payments = await stripe.paymentIntents.list({
            created: { gte: startDate, lte: endDate },
        })

        // Initializing the daily revenue
        let dailyRevenue = {}
        for (let i = 0; i < 30; i++) {
            const date = new Date();
            date.setDate(today.getDate() - i)
            const formattedDate = date.toISOString().split('T')[0];
            dailyRevenue[formattedDate] = 0;
        }

        // Filtering out all payments that didn't succeed payments
        const filteredData = payments.data.filter(payment => payment.status === 'succeeded')
            
        // Processing each payment with the date they were made and adding them to their respective days
        filteredData.forEach((payment) => {
            const date = new Date(payment.created * 1000).toISOString().split('T')[0]
            if (dailyRevenue[date] !== undefined) {
                dailyRevenue[date] += payment.amount / 100;
            }
        })

        // Formatting the response
        const revenueData = Object.keys(dailyRevenue).map((date) => ({
            date,
            revenue: dailyRevenue[date]
        }))

        return res.status(201).json({ success: true, data: revenueData})
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({ success: false, message: 'Error occurred while fetching data' })
    }
}

/**
 * 
 * Fetches data for the sales of each category in the past 12 months
 * 
 * @param {*} req 
 * @param {*} res 
 */
const fetchCategoricalSalesData = async (req, res) => {
    if (!isAdmin(req.user?.uid)) {
        console.log('Insufficient permissions.')
        return res.status(400).json({ successs: false, message: 'Insufficient permissions.'})
    }

    console.log('*** Fetching categorical sales data ***')
    try {
        const monthlySalesRef = db.collection('monthly_sales_data')
        const monthlySalesSnap = await monthlySalesRef.orderBy(admin.firestore.FieldPath.documentId(), "desc").limit(12).get()
        const categorySnap = await db.collection('product_categories').get()

        const categoricalSalesDocsReversed = monthlySalesSnap.docs.reverse()
        
        const categories = categorySnap.docs.map((doc) => doc.id)
        const dates = categoricalSalesDocsReversed.map((doc) => doc.id)

        const categorySales = categories.map((category) => ({
            category: category,
            sales: categoricalSalesDocsReversed.map((doc) => {
                const categoryToSales = doc.data().categoryToSales
                if (categoryToSales) {
                    return categoryToSales[category] === undefined ? 0 : categoryToSales[category]
                } else {
                    return 0
                }
            })
        }))

        return res.status(201).json({ success: true, data: {categorySalesData: categorySales, dates: dates} })
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({ success: false, message: 'Error occurred while fetching categorical sales data'})
    }
}

const fetchProductSalesData = async (req, res) => {
    console.log('*** Fetching monthly product sales data ***')

    if (!isAdmin(req.user?.uid)) {
        console.log('Insufficient permissions.')
        return res.status(400).json({ successs: false, message: 'Insufficient permissions.'})
    }

    try {
        const productToSales = getProductsToSalesMap()

        // Creating an array of all the product's name
        const productNamesPromises = Object.keys(productToSales).map(async (productId) => {
            const productSnap = await db.collection('products').doc(productId).get()
            const productData = productSnap?.data()
            return productData.name
        })
        
        const productNames = await Promise.all(productNamesPromises)
        const productSales = productToSales ? Object.values(productToSales).map((sales) => sales) : []

        return res.status(201).json({ success: true, data: { productNames, productSales } })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success: false, message: 'Error while fetching product sales data' })
    }
}

module.exports = { fetchMonthlyRevenueData, fetchCategoricalSalesData, fetchProductSalesData }