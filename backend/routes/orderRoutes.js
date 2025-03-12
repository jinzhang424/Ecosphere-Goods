const express = require('express')
const { fetchOrders, fetchOrderByID, updateOrderStatus } = require('../controllers/orderController')
const checkUserVerification = require('../middleware/checkUserVerification')

const router = express.Router()

router.get('/fetch-orders', checkUserVerification, fetchOrders)
router.get('/:uid/:orderID', checkUserVerification, fetchOrderByID)

router.patch('/update-order-status/:uid/:orderID', checkUserVerification, updateOrderStatus)

module.exports = router