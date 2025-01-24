const express = require('express')
const { fetchOrder } = require('../controllers/orderController')

const router = express.Router()

router.get('/fetch-orders', fetchOrder)

module.exports(router)