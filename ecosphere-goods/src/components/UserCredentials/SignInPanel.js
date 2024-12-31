import React from 'react'
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';

const SignInPanel = () => {
    
    return (
        <div className={`w-full space-y-8 flex-shrink-0 p-32`}>
            <h1 className='text-header font-LHeader'>Sign In</h1>
            <Box
                component="form"
                autoComplete="off"
                className='flex flex-col space-y-8 items-center'
            >
                <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth/>
                <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth/>
                <div className='flex justify-between w-full'>
                    <p>Remember Me</p>
                    <p className='font-header cursor-pointer hover:underline'>Forgot Password?</p>
                </div>
                <Button 
                    variant="contained" 
                    fullWidth
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
