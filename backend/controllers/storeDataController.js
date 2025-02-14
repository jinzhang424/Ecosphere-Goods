const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)
const { isAdmin } = require('./authController')

/**
 * This controller controls the general store data such as revenue, user traffic etc.
 */

const fetchMonthlyRevenueData = async (req, res) => {
    if (!isAdmin(req.user?.uid)) {
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

module.exports = { fetchMonthlyRevenueData }