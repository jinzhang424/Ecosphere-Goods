const express = require('express')
const { fetchTrackingInfo } = require('../controllers/packageTrackingController')

const router = express.Router();

router.get('/package-info/:id', fetchTrackingInfo);

module.exports = router;