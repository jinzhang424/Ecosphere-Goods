const { db } = require('../config/firebase.js')
const { isAdmin } = require('./authController.js')

const getAllOrders = async () => {
    try {
        const snapshot = await db.collection('customers').get()
        const orderData = []

        const orderPromise = snapshot.docs.map(async (doc) => {
            const customerData = doc.data()
            const ordersSnap = await doc.ref.collection('checkout_sessions').where('order_status', '!=', 'Delivered').get()

            const orders = ordersSnap.docs.map((order) => ({
                customer_id: customerData.id, 
                customer_email: customerData.email, 
                orderID: order.id,
                orderData: order.data()
            }))

            if (orders.length != 0) {
                orderData.push(...orders)
            }
        })

        await Promise.all(orderPromise)
        return orderData

    } catch (error) {
        throw new Error(error.message)
    }
}

const getUserOrders = async (userID) => {
    try {
        const customerDoc = await db.collection('customers').get().doc(userID)
        const customerData = customerSnap.data()
        
        const orderSnap = customerDoc.ref.collection('checkout_sessions').where('order_status', '!=', 'Delivered').get()
        const orders = orderSnap.docs.map((order) => ({
            customer_id: customerData.id, 
            customer_email: customerData.email, 
            orderID: order.id,
            orderData: order.data()
        }))

        if (orders.length == 0) {
            return []
        } else {
            return [...orders]
        }
        
    } catch (error) {
        throw new Error(error.message)
    }
}

const fetchOrders = async (req, res) => {
    const { userID } = req.query

    if (!userID) {
        res.status(400).json({ success: false, message: 'Fetching Orders. User ID was missing.'})
    }

    let orders
    
    try {
        if (isAdmin(userID)) {
            console.log('Getting admin orders')
            orders = await getAllOrders()
        } else {
            console.log('Getting admin orders')
            orders = await getUserOrders(userID)
        }

        return res.status(201).json({ success: false, data: orders})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success: false, message: 'Error occurred while get orders'})
    }
}

module.exports = { fetchOrders }