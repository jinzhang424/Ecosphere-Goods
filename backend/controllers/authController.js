const { admin } = require('../config/firebase') // Import admin
const { db } = require('../config/firebase.js')
const { getUserRole } = require('./userInfoController.js')

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

const generateCustomToken = async (req, res) => {
    console.log('*** Generating custom token ***')
    const { uid } = req.query

    if (!uid) {
        console.error('User id not found/undefined')
        return res.status(400).json({ success: false, message: 'A user id is necessary' })
    }

    try {
        const userDoc = await db.collection('admins').doc(uid).get()
        const auth = admin.auth();

        if (userDoc.exists) {
            await auth.createCustomToken(uid, { admin: true }).then((customToken) => {
                return res.status(201).json({ success: true, customToken: customToken})
            })
        } else {
            await auth.createCustomToken(uid, { admin: true }).then((customToken) => {
                return res.status(201).json({ success: false, customToken: customToken})
            })
        }
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success: false, message: 'Error occurred while getting custom token'})
    }
}

module.exports = { registerUser, signInUser, fetchUserRole, generateCustomToken }