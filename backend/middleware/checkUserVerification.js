const { admin } = require('../config/firebase')

/**
 * 
 * Returns true or false depending on whether the user is or isn't verified
 * 
 * @param {*} uid 
 */
const checkUserVerification = async (req, res) => {
    console.log('*** Checking if user is verified ***')
    const idToken = idToken = req.headers.authorization?.split('Bearer ')[1];

    if (!idToken) {
        return res.status(403).json({ success: false, message: 'No Token provided'});
    }

    try {
        decodedToken = await admin.auth().verifyIdToken(idToken)
        const uid = decodedToken.uid;

        const userRecord = await admin.auth().getUser(uid);

        if (!userRecord.emailVerified) {
            return res.status(403).json({ success: false, message: 'Email not verified' });
        }

        req.user = userRecord;
        next();
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: 'Error occurred while checking user verification'});
    }
}

module.exports = checkUserVerification 