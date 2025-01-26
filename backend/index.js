require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const admin = require('./config/firebase');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes')
const orderRoutes = require('./routes/orderRoutes')
const checkoutRoutes = require('./routes/checkoutRoutes')

// Create an Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse JSON bodies from requests

// Root route
app.get('/', (req, res) => {
    res.send('Backend is running.');
});


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Routes
app.use('/auth', authRoutes)
app.use('/products', productRoutes)
app.use('/order', orderRoutes)
app.use('/checkout', checkoutRoutes)