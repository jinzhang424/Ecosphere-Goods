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
                customer_id: doc.id, 
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

const getUserOrders = async (uid) => {
    try {
        const customerDoc = db.collection('customers').doc(uid)
        const customerSnap = await customerDoc.get()
        const customerData = customerSnap.data()
        
        const orderSnap = await customerSnap.ref.collection('checkout_sessions').where('order_status', '!=', 'Delivered').get()
        const ordersDocs = orderSnap.docs

        if (!ordersDocs) {
            console.log('There were no orders docs for this user')
            return []
        }
        
        const orders = ordersDocs.map((order) => ({
            customer_id: customerDoc.id, 
            customer_email: customerData.email, 
            orderID: order.id,
            orderData: order.data()
        }))

        return [...orders]
        
    } catch (error) {
        throw new Error(error.message)
    }
}

const fetchOrders = async (req, res) => {
    const uid = req.user?.uid

    if (!uid) {
        res.status(400).json({ success: false, message: 'Fetching Orders. User ID was missing.'})
    }

    let orders
    
    try {
        if (await isAdmin(uid)) {
            console.log('Getting admin orders')
            orders = await getAllOrders()
        } else {
            console.log('Getting user orders')
            orders = await getUserOrders(uid)
        }

        return res.status(201).json({ success: false, data: orders})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success: false, message: 'Error occurred while get orders'})
    }
}

const fetchOrderByID = async (req, res) => {
    console.log('Fetching Order By ID')
    const { orderID } = req.params
    const uid = req.user?.uid
    
    if (!orderID) {
        console.log('Order ID is undefined')
        return res.status(400).json({ success: false, message: 'Order ID is undefined'})
    }

    try {
        const customerDoc = db.collection('customers').doc(uid)
        const customerSnap = await customerDoc.get()
        const orderSnap = await customerSnap.ref.collection('checkout_sessions').doc(orderID).get()

        const customerData = customerSnap.data()

        const orderInfo = {
            customer_id: customerDoc.id,
            customer_email: customerData.email,
            orderID: orderSnap.id,
            orderData: orderSnap.data()
        }

        return res.status(201).json({ success: true, data: orderInfo})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success: false, message: error.messaage})
    }
}

module.exports = { fetchOrders, fetchOrderByID }