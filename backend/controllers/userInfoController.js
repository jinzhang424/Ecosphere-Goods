const { db } = require("../config/firebase")

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
    const { userID } = req.params

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

const setProfileImage = async (req, res) => {
    console.log('*** Setting profile image ***')

    const { profileImage, userID } = req.body

    if (!profileImage || !userID) {
        console.error('Profile image or user id was undefined')
        return res.status(400).json({ success: false, message: 'Profile image or user id is undefined'})
    }

    try {
        await db.collection('customers').doc(userID).update({
            profile_image: profileImage
        })

        console.log('*** Successfully set profile image ***')
        return res.status(201).json({ success: true, message: 'Successfully set profile image'})
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({ success: false, message: 'Error while setting profile image'})
    }
}

const fetchProfileImage = async (req, res) => {
    console.log('*** Fetching user profile image ***')
    const { userID } = req.params

    if (!userID) {
        console.error('Missing user id')
        return res.status(400).json({ success: false, message: 'User id was undefined'})
    }

    try {
        const userSnap = await db.collection('customers').doc(userID).get()
        const userData = userSnap.data()

        return res.status(201).json({ success: true, data: userData.profile_image})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success: false, message: 'Error fetching user profile image'})
    }
}

module.exports = { setDeliveryInfo, fetchDeliveryInfo, setProfileImage, fetchProfileImage }