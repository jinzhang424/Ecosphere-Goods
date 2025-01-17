const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors');
const stripe = require('stripe')(functions.config().stripe.secret);

admin.initializeApp();

const corsHandler = cors({ origin: true });

exports.createStripeProduct = functions.region('australia-southeast1').https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    try {
      const { name, price, image, subcategory } = req.body;

      if (!name || !price || !image || !subcategory) {
        return res.status(400).json({ error: 'Missing required fields: name, price, image, subcategory' });
      }

      const product = await stripe.products.create({
        name,
        images: [image],
        metadata: { subcategory },
      });

      const priceData = await stripe.prices.create({
        unit_amount: price * 100,
        currency: 'nzd',
        product: product.id,
      });

      res.status(200).json({ product, price: priceData });
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ error: error.message });
    }
  });
});