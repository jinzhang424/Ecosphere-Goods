const express = require('express')
const { registerUser } = require('../controllers/authController')

const router = express.Router()

router.post('/register', registerUser) // Specifying the route for the call

router.get('/profile', verifyFirebaseToken, (req, res) => {
    res.json({ message: 'Welcome to your profile!', user: req.user });
});

module.exports = router