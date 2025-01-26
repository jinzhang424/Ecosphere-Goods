const express = require('express')
const { fetchSessionID } = require('../controllers/checkoutController')

const router = express.Router()

router.get('/fetch-session-id', fetchSessionID)

module.exports = router