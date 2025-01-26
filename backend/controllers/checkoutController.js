const { db } = require('../config/firebase.js')

const fetchSessionID = async (req, res) => {
    console.log('*** Fetching session ID for checkout ***')
    const { userID, cartItems } = req.query

    if (!userID || !cartItems) {
        console.log('Missing user id or cart items')
        res.status(400).json({ success: false, message: 'Missing user id or cart items'})
    }

    try {
        const customerRef = db.collection('customers').doc(userID)
        const orderRef = customerRef.collection('checkout_sessions')
        
        const lineItems = cartItems.map((item) => ({
            price: item.product.prices[0].priceId,
            quantity: item.quantity
        }))

        const docRef = await orderRef.add({
            mode: 'payment',
            products: cartItems,
            line_items: lineItems,
            success_url: window.location.origin,
            cancel_url: window.location.origin,
            order_status: 'Pending',
            total_price: subTotal + 500,
        })

        docRef.onSnapshot(async (snap) => {
            const { error, sessionId } = snap.data()

            if (error) {
                docRef.update({
                    order_status: 'Cancelled'  
                })

                console.log('Error occurred while generating session id')
                return res.status(500).json({ success: false, message:'Encountered error while generating session id'})
            }

            if (sessionId) {
                return res.status(201).json({ success: true, data: sessionId})
            }
        })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success: false, message: 'Encountered error while created session ID'})
    }
}

module.exports = { fetchSessionID }