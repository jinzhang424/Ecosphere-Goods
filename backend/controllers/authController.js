const { admin } = require('../config/firebase') // Import admin

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

        res.status(201).json({
            success: true,
            message: 'Account successfully created',
            user: {
                uid: userRecord.uid,
                email: userRecord.email,
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

module.exports = { registerUser, signInUser }