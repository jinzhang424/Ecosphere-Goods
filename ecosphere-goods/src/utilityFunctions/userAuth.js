import { toast } from "react-toastify";
import axios from "axios";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // Adjust the import path as needed

export const handleSignIn = async (email, password, navigate) => {
    if (!email || !password) {
        toast.error('Please enter your email and password.');
        return;
    }

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const idToken = await userCredential.user.getIdToken();

        const response = await axios.post('http://localhost:5000/auth/sign-in', { idToken });

        toast.success('Sign-in successful!');
        navigate('/');
    } catch (error) {
        toast.error(error.message || 'Error signing in');
        throw new Error(error.message || 'Error signing in');
    }
};

export const registerUser = async (email, password, confirmPassword) => {
    if (password !== confirmPassword) {
        toast.error('Passwords do not match!');
        throw new Error('Passwords do not match!');
    }

    try {
        const response = await axios.post('http://localhost:5000/auth/register', { email, password });
        toast.success('Account Successfully Created!');
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Error registering user';
        toast.error(errorMessage);
        throw new Error(errorMessage);
    }
};