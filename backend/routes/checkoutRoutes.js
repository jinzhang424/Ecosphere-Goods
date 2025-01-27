const express = require('express')
const { fetchCheckoutSessionID } = require('../controllers/checkoutController')

const router = express.Router()

router.get('/fetch-session-id', fetchCheckoutSessionID)

module.exports = router