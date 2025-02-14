const express = require('express')
const { fetchMonthlyRevenueData } = require('../controllers/storeDataController')

const router = express.Router()

router.get('/monthly-revenue', fetchMonthlyRevenueData)

module.exports = router