require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes')
const orderRoutes = require('./routes/orderRoutes')
const checkoutRoutes = require('./routes/checkoutRoutes')
const userInfoRoutes = require('./routes/userInfoRoutes')
const storeDataRoutes = require('./routes/storeDataRoutes')
const stripeEventRoutes = require('./routes/stripeEventRoutes')
const packageTrackingRoutes = require('./routes/packageTrackinigRoutes')

// Create an Express app
const app = express();

// Middleware setup
app.use(bodyParser.json()); // Parse JSON bodies from requests

// Root route
app.get('/', (req, res) => {
    res.send('Backend is running.');
});

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/checkout', checkoutRoutes)
app.use('/api/user-info', userInfoRoutes)
app.use('/api/store-data', storeDataRoutes)
app.use('/api/stripe-webhook', stripeEventRoutes)
app.use('/api/package-tracking', packageTrackingRoutes)

module.exports = app;