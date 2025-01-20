const { admin } = require('../config/firebase') // Import admin
const { db } = require('../config/firebase.js')

const registerUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required'})
    }

    try {
        const userRecord = await admin.auth().createUser({
            email,
            password,
        });

        await db.collection('users').doc(userRecord.uid).set({
            email: userRecord.email,
            role: 'customer',
        });

        res.status(201).json({
            success: true,
            message: 'Account successfully created',
            user: {
                uid: userRecord.uid,
                email: userRecord.email,
                role: 'customer',
            }
        })
    } catch (error) {
        console.error('Error creating user: ', error)
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

const fetchUserRole = (uid) => {
    const userDoc = db.collection('customers').doc(uid).get()
    if (!userDoc.exists) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }
    const userData = userDoc.data()

    const role = userData.role
    
    return role
}

const signInUser = async(req, res) => {
    const { idToken } = req.body

    if (!idToken) {
        return res.status(400).json({ success: false, message: 'ID token is required' });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const uid = decodedToken.uid

        const role = fetchUserRole(uid)
        const customToken = await admin.auth().createCustomToken(uid)

        return res.status(200).json({ success: true, token: customToken, role: role });
    } catch (error) {
        console.error('Error signing in user:', error)
    }
}

module.exports = { registerUser, signInUser, fetchUserRole }