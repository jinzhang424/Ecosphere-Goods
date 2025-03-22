const admin = require('firebase-admin')
const path = require('path')
require('dotenv').config()

const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH;
const serviceAccount = require(path.join(__dirname, serviceAccountPath))

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()

module.exports = { admin, db }