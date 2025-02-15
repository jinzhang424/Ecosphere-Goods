const express = require('express')
const { fetchMonthlyRevenueData, fetchCategoricalSalesData } = require('../controllers/storeDataController')
const checkUserVerification = require('../middleware/checkUserVerification')

const router = express.Router()

router.get('/monthly-revenue', checkUserVerification, fetchMonthlyRevenueData)
router.get('/categorical-sales', checkUserVerification, fetchCategoricalSalesData)

module.exports = router