const express = require('express')
const { fetchDeliveryInfo, setDeliveryInfo, setProfileImage, fetchProfileImage } = require('../controllers/userInfoController')

const router = express.Router()

router.post('/set-profile-image', setProfileImage)
router.post('/set-delivery-info', setDeliveryInfo)
router.get('/delivery-info/:userID', fetchDeliveryInfo)
router.get('/profile-image/:userID', fetchProfileImage)

module.exports = router