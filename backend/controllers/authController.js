const admin = require('../config/firebase') // Import admin

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

module.exports(registerUser)