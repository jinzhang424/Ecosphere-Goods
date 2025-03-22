const admin = require('firebase-admin')
const path = require('path')
require('dotenv').config()

const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK)

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()

module.exports = { admin, db }