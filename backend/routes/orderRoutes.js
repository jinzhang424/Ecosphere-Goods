const express = require('express')
const { fetchOrders, fetchOrderByID } = require('../controllers/orderController')

const router = express.Router()

router.get('/fetch-orders', fetchOrders)
router.get('/fetch-order-by-id', fetchOrderByID)

module.exports = router