const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const admin = require('./config/firebase');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
require('dotenv').config();

// Create an Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse JSON bodies from requests

// Middleware to verify Firebase ID tokens
const verifyFirebaseToken = async (req, res, next) => {
    const idToken = req.headers.authorization?.split('Bearer ')[1]; // Extract token from Authorization header

    if (!idToken) {
        return res.status(401).send({ error: 'Unauthorized: No token provided' });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken); // Verify the token
        req.user = decodedToken; // Attach user info to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(401).send({ error: 'Unauthorized: Invalid token' });
    }
};

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});