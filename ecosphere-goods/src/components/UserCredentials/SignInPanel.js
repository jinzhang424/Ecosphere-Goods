import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import PasswordTextField from './PasswordTextField';
import BackToBrowsingButton from '../utility/BackToBrowsingButton';
import { useNavigate } from 'react-router-dom';
import { handleSignIn } from '../../utilityFunctions/userAuth';
import { toast } from 'react-toastify';

const SignInPanel = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    
    const onSignIn = async () => {
        try {
            await handleSignIn(email, password)
            toast.success('Sign-in successful!');
            navigate('/');
        } catch (error) {
            toast.error(error.message)
        }
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
                <Button 
                    variant="contained" 
                    fullWidth
                    onClick={ onSignIn }
                    sx={{
                        backgroundColor: '#362D2D',
                        height: '3rem',
                        width: '60%',
                    }}
                >
                    Login
                </Button>
            </Box>
        </div>
    )
}

export default SignInPanel
