const express = require('express')
const { registerUser, signInUser, fetchUserRole } = require('../controllers/authController')
const verifyFirebaseToken = require('../middleware/verifyFirebaseToken')

const router = express.Router()

router.post('/register', registerUser) // Specifying the route for the call

router.post('/sign-in', signInUser);

router.get('/fetch-user-role', fetchUserRole)

router.get('/profile', verifyFirebaseToken, (req, res) => {
    res.json({ message: 'Welcome to your profile!', user: req.user });
});

module.exports = router