const express = require('express')
const { fetchOrders, fetchOrderByID } = require('../controllers/orderController')

const router = express.Router()

router.get('/fetch-orders', fetchOrders)
router.get('/:userID/:orderID', fetchOrderByID)

module.exports = router