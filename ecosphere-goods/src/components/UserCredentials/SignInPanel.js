import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

const SignInPanel = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    console.log(email)
    console.log(password)
    
    const handleSignIn = () => {
        signInWithEmailAndPassword(
            auth,
            email,
            password,
        ).then((authUser) => {
            console.log(authUser)
        }).catch((error) => {
            alert(error.message)
        })
    }
    
    return (
        <div className={`w-full space-y-8 flex-shrink-0 p-32`}>
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
                <TextField 
                    id="sign-in-password-textfield" 
                    onChange={(e) => setPassword(e.target.value)}
                    label="Password" 
                    variant="outlined" 
                    fullWidth
                />
                <div className='flex justify-between w-full'>
                    <p>Remember Me</p>
                    <p className='font-header cursor-pointer hover:underline'>Forgot Password?</p>
                </div>
                <Button 
                    variant="contained" 
                    fullWidth
                    onClick={ handleSignIn }
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
