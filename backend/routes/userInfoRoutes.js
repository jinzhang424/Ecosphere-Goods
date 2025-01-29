const express = require('express')
const { fetchDeliveryInfo, setDeliveryInfo, setProfileImage, fetchProfileImage } = require('../controllers/userInfoController')

const router = express.Router()

router.post('/set-profile-image', setProfileImage)
router.post('/set-delivery-info', setDeliveryInfo)
router.get('/fetch-user-info', fetchDeliveryInfo)
router.get('/fetch-profile-image', fetchProfileImage)

module.exports = router