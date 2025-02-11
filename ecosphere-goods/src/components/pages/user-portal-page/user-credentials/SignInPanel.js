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
import { sendEmailVerification } from 'firebase/auth';

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
                navigate('verification')
            }
        } catch (error) {
            toast.error(error.message)
        }
        setLoading(false)
    }
    
    return (
        <div className={`w-full space-y-8 flex-shrink-0 p-32`}>
            <BackToBrowsingButton/>
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
                <div className='w-4/6'><UncontainedButton onClick={ onSignIn } label='Login' loading={loading}/></div>
            </Box>
        </div>
    )
}

export default SignInPanel
