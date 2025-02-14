const express = require('express')
const { fetchMonthlyRevenueData } = require('../controllers/storeDataController')
const checkUserVerification = require('../middleware/checkUserVerification')

const router = express.Router()

router.get('/monthly-revenue', checkUserVerification, fetchMonthlyRevenueData)

module.exports = router