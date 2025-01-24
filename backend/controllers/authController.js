const { admin } = require('../config/firebase') // Import admin
const { db } = require('../config/firebase.js')

const isAdmin = async (uid) => {
    const userRole = getUserRole(userID)
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

        await db.collection('customers').doc(userRecord.uid).set({
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

const fetchUserRole = async (req, res) => {
    const { uid } = req.query;

    if (!uid) {
        return res.status(400).json({ success: false, message: 'Missing UID'})
    }

    try  {
        const role = await getUserRole(uid)
        return res.status(200).json({ success: true, role: role })
    } catch (error) {
        console.error( error.message || 'Error fetching user role')
        return res.status(500).json({ success: false, message: 'Error fetching user role'})
    }
}

const signInUser = async(req, res) => {
    const { idToken } = req.body

    if (!idToken) {
        return res.status(400).json({ success: false, message: 'ID token is required' });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const uid = decodedToken.uid

        const role = getUserRole(uid)
        const customToken = await admin.auth().createCustomToken(uid)

        return res.status(200).json({ success: true, token: customToken, role: role });
    } catch (error) {
        console.error('Error signing in user:', error)
    }
}

module.exports = { registerUser, signInUser, fetchUserRole, isAdmin }