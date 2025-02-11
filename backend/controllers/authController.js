const { admin } = require('../config/firebase') // Import admin
const { db } = require('../config/firebase.js')

/**
 * 
 * Uses custom claims to check whether the user is an admin
 * 
 * @param {} uid The user id of the user 
 * @returns A boolean value that of whether the user is an admin or not
 */
const isAdmin = async (uid) => {
    console.log('*** Checking whether user is admin ***')
    try {
        const userRecord = await admin.auth().getUser(uid)
        return userRecord.customClaims?.admin == true
    } catch (error) {
        throw new Error(error.message)
    }
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

const signInUser = async(req, res) => {
    const { idToken } = req.body

    if (!idToken) {
        return res.status(400).json({ success: false, message: 'ID token is required' });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const uid = decodedToken.uid

        const customToken = await admin.auth().createCustomToken(uid)

        return res.status(200).json({ success: true, token: customToken });
    } catch (error) {
        console.error('Error signing in user:', error)
    }
}

const handleSetCustomUserClaims = async (req, res) => {
    const { uid } = req.body

    if (!uid) {
        console.error('UID is undefined')
        return res.status(400).json({ success: false, message:'UID is undefined'})
    }

    try {
        const userDoc = await db.collection('admins').doc(uid).get()
        const auth = admin.auth();

        if (userDoc.exists) {
            await auth.setCustomUserClaims(uid, { admin: true})
        } else {
            await auth.setCustomUserClaims(uid, { admin: false})
        }
        
        console.log('Successfully set customer user claims')
        return res.status(201).json({ success: true, message: 'Successfully set customer user claims'})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success: false, message: 'Error occurred while setting custom user claims'})
    }
}

module.exports = { registerUser, signInUser, handleSetCustomUserClaims, isAdmin }