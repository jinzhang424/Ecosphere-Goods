import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

require('dotenv').config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "ecosphere-goods.firebaseapp.com",
  projectId: "ecosphere-goods",
  storageBucket: "ecosphere-goods.firebasestorage.app",
  messagingSenderId: "308765407455",
  appId: "1:308765407455:web:1769e1bf4967d35b64d16a",
  measurementId: "G-VPEEB7F5VF"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth }
export default db