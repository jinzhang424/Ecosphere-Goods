import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';
import PasswordTextField from './PasswordTextField';
import BackToBrowsingButton from '../../../utility/general-buttons/BackToBrowsingButton';
import { useNavigate } from 'react-router-dom';
import { handleSignIn } from '../../../../api/userAuth';
import { toast } from 'react-toastify';
import UncontainedButton from '../../../utility/general-buttons/UncontainedButton';
import { auth } from '../../../../firebase';
import { GoogleAuthProvider, sendEmailVerification, signInWithPopup } from 'firebase/auth';
import { FaGoogle } from "react-icons/fa";

const SignInPanel = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState('')
    
    const onSignIn = async (event) => {
        event.preventDefault()
        setLoading(true)
        try {
            await handleSignIn(email, password)
            toast.success('Sign-in successful!');
            
            if (auth.currentUser.emailVerified) {
                navigate('/')
            } else {
                await sendEmailVerification(auth.currentUser)
                navigate('/verification')
            }
        } catch (error) {
            toast.error(error.message)
        }
        setLoading(false)
    }

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
            .then(async (result) => {
                const user = result.user

                if (!user) {
                    toast.error('Error occurred while trying to sign in with google.')
                    return;
                }

                if (user.emailVerified) {
                    navigate('/')
                } else {
                    await sendEmailVerification(auth.currentUser)
                    navigate('/verification')
                }
            })
            .catch((error) => {
                console.log(error.message)
                toast.error('Error occurred while trying to sign in with google.')
            })
    }
    
    return (
        <div className='w-full space-y-8 flex-shrink-0 p-32'>
            <BackToBrowsingButton>Back To Browsing</BackToBrowsingButton>
            <h1 className='text-header font-LHeader'>Sign In</h1>
            <Box
                component="form"
                autoComplete="off"
                className='flex flex-col space-y-8 items-center'
            >
                <TextField 
                    id="sign-in-email-textfield" 
                    onChange={(e) => setEmail(e.target.value)}
                    label="Email" 
                    variant="outlined" 
                    fullWidth
                />
                <PasswordTextField setPassword={ setPassword } label='Password'/>
                <div className='flex justify-between w-full'>
                    <p>Remember Me</p>
                    <p className='font-header cursor-pointer hover:underline'>Forgot Password?</p>
                </div>

                {/** Login Button */}
                <div className='w-4/6'>
                    <UncontainedButton onClick={ onSignIn } loading={loading}>
                        Login
                    </UncontainedButton>
                </div>
            </Box>

            <div className='flex items-center opacity-40'>
                <div className='bg-dark-brown flex-grow h-0.5 opacity-50'/>
                <p className='pr-3 pl-3 text-dark-brown font-header'>or continue with</p>
                <div className='bg-dark-brown flex-grow h-0.5 opacity-50'/>
            </div>

            <div className='flex justify-center w-full'>
                <div className='w-1/6'>
                    <UncontainedButton 
                        className='bg-dark-brown bg-opacity-0 border-3 border-dark-brown text-dark-brown p-3 pl-6 pr-6 rounded-full hover:text-off-white hover:bg-opacity-100 transition-all ease-in-out duration-300'
                        onClick={signInWithGoogle}
                    >
                            <FaGoogle/>
                    </UncontainedButton>
                </div>
            </div>
        </div>
    )
}

export default SignInPanel
