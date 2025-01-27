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
        const response = await axios.post('http://localhost:5000/auth/sign-in', { idToken });
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
        const response = await axios.post('http://localhost:5000/auth/register', { email, password });
    } catch (error) {
        throw new Error('Error occured while registering.');
    }
};

export const fetchRole = async (uid) => {
    try {
        const response = await axios.get('http://localhost:5000/auth/fetch-user-role', {
            params: { uid }
        })

        return response.data.role
    } catch (error) {
        throw new Error('Error occurred while fetching role')
    }
}

export const updateDeliveryAddress = async (userID, address, country, zipCode, phoneNumber) => {
    try {
        const response = await axios.post('http://localhost:5000/auth/set-delivery-address', {
            userID, address, country, zipCode, phoneNumber
        })
    } catch (error) {
        throw new Error('Error while updating delivery address')
    }
}
