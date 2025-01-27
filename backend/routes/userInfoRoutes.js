const express = require('express')

const router = express.Router()

router.post('/set-delivery-address', setDeliveryInfo)

module.exports = router