const admin = require('../config/firebase')

const verifyFirebaseToken = async (req, res, next) => {
    const idToken = req.headers.authorization?.split('Bearer ')[1]; // Extract token from Authorization header

    if (!idToken) {
        return res.status(401).send({ error: 'Unauthorized: No token provided' });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken); // Verify the token
        req.user = decodedToken; // Attach user info to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(401).send({ error: 'Unauthorized: Invalid token' });
    }
};

module.exports = verifyFirebaseToken