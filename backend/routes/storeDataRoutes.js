const express = require('express')
const checkUserVerification = require('../middleware/checkUserVerification')
const { 
    fetchMonthlyRevenueData, 
    fetchCategoricalSalesData, 
    fetchProductSalesData, 
    fetchProductRevenueData 
} = require('../controllers/storeDataController')

const router = express.Router()

router.get('/monthly-revenue', checkUserVerification, fetchMonthlyRevenueData)
router.get('/categorical-sales', checkUserVerification, fetchCategoricalSalesData)
router.get('/product-sales', checkUserVerification, fetchProductSalesData)
router.get('/product-revenue', checkUserVerification, fetchProductRevenueData)

module.exports = router