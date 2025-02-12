const express = require('express')
const { fetchOrders, fetchOrderByID } = require('../controllers/orderController')
const checkUserVerification = require('../middleware/checkUserVerification')

const router = express.Router()

router.get('/fetch-orders', checkUserVerification, fetchOrders)
router.get('/:orderID', checkUserVerification, fetchOrderByID)

module.exports = router