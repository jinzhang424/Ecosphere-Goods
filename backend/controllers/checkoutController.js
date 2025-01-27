const { db } = require('../config/firebase.js')
const { unsubscribe } = require('../routes/authRoutes.js')

const fetchCheckoutSessionID = async (req, res) => {
    console.log('*** Fetching session ID for checkout ***')
    const { userID, cartItemsIDs, successUrl, cancelUrl, subtotal } = req.query

    if (!userID || !cartItemsIDs || !successUrl || !cancelUrl || !subtotal) {
        console.log('Missing user id or cart items')
        res.status(400).json({ success: false, message: 'Missing parameters'})
    }

    try {
        const customerRef = db.collection('customers').doc(userID)
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
            products.push({id: item.productId, ...productData})
        }

        const docRef = await orderRef.add({
            mode: 'payment',
            products: products,
            line_items: lineItems,
            success_url: successUrl,
            cancel_url: cancelUrl,
            order_status: 'Cancelled',
            total_price: parseInt(subtotal) + 500,
        })

        const unsubscribe = docRef.onSnapshot(async (snap) => {
            const { error, sessionId } = snap.data()

            if (error) {
                console.error('Error occurred while generating session id:', error.message)
                return res.status(500).json({ success: false, message:'Encountered error while generating session id'})
            }

            if (sessionId) {
                await docRef.update({
                    order_status: 'Pending'  
                })
                unsubscribe()
                return res.status(201).json({ success: true, data: sessionId})
            }
        })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success: false, message: 'Encountered error while creating session ID'})
    }
}

module.exports = { fetchCheckoutSessionID }