const express = require('express')
const { registerUser, signInUser, handleSetCustomUserClaims } = require('../controllers/authController')

const router = express.Router()

router.post('/register', registerUser) // Specifying the route for the call

router.post('/sign-in', signInUser);

router.post('/set-custom-user-claims', handleSetCustomUserClaims);

module.exports = router