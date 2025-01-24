const express = require('express')
const { fetchOrder } = require('../controllers/orderController')

const router = express.Router()

router.get('/get-orders', fetchOrder)

module.exports(router)