const express = require('express')
const { fetchDeliveryInfo, updateDeliveryInfo, setProfileImage, fetchProfileImage, updateBasicInfo } = require('../controllers/userInfoController')
const checkUserVerification = require('../middleware/checkUserVerification')

const router = express.Router()

router.post('/set-profile-image', setProfileImage)
router.post('/update-delivery-info', checkUserVerification, updateDeliveryInfo)
router.post('/update-basic-info', checkUserVerification, updateBasicInfo)

router.get('/delivery-info/:userID', fetchDeliveryInfo)
router.get('/profile-image/:userID', fetchProfileImage)

module.exports = router