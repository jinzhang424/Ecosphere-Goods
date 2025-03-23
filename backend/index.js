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
const PORT = process.env.PORT || 5000;

// Middleware setup
const corsOptions = {
    origin: ['https://ecosphere-goods.web.app/', 'http://localhost:3000']
}

app.use(cors(corsOptions)); // Enable Cross-Origin Resource Sharing
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
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/checkout', checkoutRoutes)
app.use('/api/user-info', userInfoRoutes)
app.use('/api/store-data', storeDataRoutes)
app.use('/api/stripe-webhook', stripeEventRoutes)
app.use('/api/package-tracking', packageTrackingRoutes)