const { db } = require("../config/firebase")

const isAdmin = async (userID) => {
    const userRole = await getUserRole(userID)
    return userRole == 'admin'
}

const getUserRole = async (uid) => {
    if (!uid) {
        throw new Error('UID is requried')
    }

    const userDoc = await db.collection('customers').doc(uid).get()
    if (!userDoc.exists) {
        throw new Error('User not found')
    }
    const userData = userDoc.data()
    
    if (!userData.role) {
        // Set default role if not present
        userData.role = 'customer';
        await db.collection('customers').doc(uid).update({ role: 'customer' });
    }

    return userData.role
}

const setDeliveryInfo = async (req, res) => {
    console.log('*** Updating Delivery Info ***')
    const { userID, address, country, zipCode, phoneNumber } = req.body

    if (!userID || !address) {
        console.error('Missing user id or delivery address')
        return res.status(400).json({ success: false, message: 'Missing user id or delivery address'})
    }

    try {
        await db.collection('customers').doc(userID).update({
            deliveryInfo: {
                address: address,
                zipCode: zipCode,
                country: country,
                phoneNumber: phoneNumber
            }
        })

        return res.status(201).json({ success: true })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success: false, message: 'Error updating or adding delivery address' })
    }
}

const fetchDeliveryInfo = async (req, res) => {
    console.log('*** Fetching Delivery Info ***')
    const { userID } = req.query

    if (!userID) {
        console.error('Missing user id')
        return res.status(400).json({ success: false, message: 'Missing user id'})
    }

    try {
        const userSnap = await db.collection('customers').doc(userID).get()
        const userData = userSnap.data()
        const deliveryInfo = userData.deliveryInfo

        return res.status(201).json({ success: false, data: deliveryInfo})
    } catch (error) {
        console.error('Error while fetching delivery info', error.message)
        return res.status(500).json({ success: false, messsage: 'Error while fetching delivery info' })
    }
}

module.exports = { setDeliveryInfo, fetchDeliveryInfo, isAdmin, getUserRole }