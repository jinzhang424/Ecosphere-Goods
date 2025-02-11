import axios from "axios";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // Adjust the import path as needed

export const handleSignIn = async (email, password) => {
    if (!email || !password) {
        throw new Error('Please enter your email and password')
    }

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const idToken = await userCredential.user.getIdToken();
        await axios.post('http://localhost:5000/auth/sign-in', { idToken });
    } catch (error) {
        throw new Error('Error signing in. Please check your email and password.')
    }
};

export const registerUser = async (email, password, passwordMatch) => {
    if (!email || !password) {
        throw new Error('Please enter an email and password.')
    }

    if (!passwordMatch) {
        throw new Error('Passwords do not match!');
    }

    try {
        await axios.post('/auth/register', { email, password });
    } catch (error) {
        throw new Error('Error occured while registering.');
    }
};

export const handleSetCustomUserClaims = async (uid) => {
    try {
        await axios.post('/auth/set-custom-user-claims', {
            uid
        })
    } catch (error) {
        console.log(error.message)
    }
}