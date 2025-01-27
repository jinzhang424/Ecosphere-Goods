const express = require('express')
const { fetchDeliveryInfo, setDeliveryInfo } = require('../controllers/userInfoController')

const router = express.Router()

router.post('/set-delivery-address', setDeliveryInfo)
router.get('/fetch-user-info', fetchDeliveryInfo)

module.exports = router