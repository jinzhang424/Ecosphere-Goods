const express = require('express')
const { updateMonthlySalesData, updateSuccessfulOrder } = require('../controllers/stripeEventController')

const router = express.Router()

router.post('/update-monthly-sales-data', express.json({ type: 'application/json' }), updateMonthlySalesData)
router.post('/update-successful-order', express.json({ type: 'application/json' }), updateSuccessfulOrder)

module.exports = router