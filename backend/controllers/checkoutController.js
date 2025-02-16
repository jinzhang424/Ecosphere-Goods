const { db } = require('../config/firebase.js')
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const fetchCheckoutSessionID = async (req, res) => {
    console.log('*** Fetching session ID for checkout ***')
    const { cartItemsIDs, successUrl, cancelUrl, subtotal } = req.query
    const uid = req.user?.uid

    if (!uid || !cartItemsIDs || !successUrl || !cancelUrl || !subtotal) {
        console.log('Missing parameters')
        return res.status(400).json({ success: false, message: 'Missing parameters'})
    }

    try {
        const customerRef = db.collection('customers').doc(uid)
        const orderRef = customerRef.collection('checkout_sessions')
        
        const lineItems = []
        const products = []
        
        for (const item of cartItemsIDs) {
            const productDoc = db.collection('products').doc(item.productId)
            const productSnap = await productDoc.get()
            const productData = productSnap.data()

            const priceSnap = await productDoc.collection('prices').where('active', '==', true).get()
            const price = priceSnap.docs[0]

            lineItems.push({
                price: price.id,
                quantity: parseInt(item.quantity)
            })

            productData.priceData = price.data()
            products.push({id: item.productId, quantity: parseInt(item.quantity), ...productData})
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: successUrl,
            cancel_url: cancelUrl,
            metadata: {
                uid: uid,
                products: JSON.stringify(products.map((product) => ({ 
                    id: product.id, 
                    quantity: product.quantity, 
                    category: product.metadata.itemCategory 
                }))),
            } 
        })

        await orderRef.add({
            mode: 'payment',
            products: products,
            line_items: lineItems,
            success_url: successUrl,
            cancel_url: cancelUrl,
            order_status: 'Cancelled',
            total_price: parseInt(subtotal) + 500,
            sessionId: session.id
        })

        return res.status(201).json({ success: true, data: session.id})

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success: false, message: 'Encountered error while creating session ID'})
    }
}

module.exports = { fetchCheckoutSessionID }