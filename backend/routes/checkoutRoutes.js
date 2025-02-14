const express = require('express')
const { fetchCheckoutSessionID } = require('../controllers/checkoutController')
const checkUserVerification = require('../middleware/checkUserVerification')

const router = express.Router()

router.get('/fetch-session-id', checkUserVerification, fetchCheckoutSessionID)

module.exports = router