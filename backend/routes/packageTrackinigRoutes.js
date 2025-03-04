const express = require('express')
const { getPackageLocation } = require('../controllers/packageTrackingController')

const router = express.Router();

router.get('/package-info/:trackingNumber', getPackageLocation);

module.exports = router;