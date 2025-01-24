const express = require('express')
const { fetchOrders } = require('../controllers/orderController')

const router = express.Router()

router.get('/fetch-orders', fetchOrders)

module.exports = router