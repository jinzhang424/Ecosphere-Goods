const express = require('express')
const { updateMonthlySalesData } = require('../controllers/stripeEventController')

const router = express.Router()

router.post('/update-monthly-sales-data', express.json({ type: 'application/json' }), updateMonthlySalesData)

module.exports = router