const express = require('express')
const { registerUser, signInUser, fetchUserRole, handleSetCustomUserClaims, generateCustomToken } = require('../controllers/authController')

const router = express.Router()

router.post('/register', registerUser) // Specifying the route for the call

router.post('/sign-in', signInUser);

router.get('/fetch-user-role', fetchUserRole)

router.get('/generate-custom-token', generateCustomToken) 

module.exports = router