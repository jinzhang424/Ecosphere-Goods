const { admin } = require('../config/firebase')

/**
 * 
 * Returns true or false depending on whether the user is or isn't verified
 * 
 * @param {*} uid 
 */
export const checkUserVerification = async (req, res) => {
    console.log('*** Checking if user is verified ***')

    admin.auth().getUser(uid)
        .then((userRecord) => {
            const isVerified = userRecord.emailVerified;
            
            if (isVerified) {
                next()
            } else {
                console.error('User is not verified.')
                return res.status(400).json({ success: false, message: 'User is not verified'})
            }
        })
}