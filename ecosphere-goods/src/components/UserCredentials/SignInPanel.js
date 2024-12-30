import React from 'react'
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';

const SignInPanel = ({ style, setSignUp }) => {
    
    return (
        <div className={`w-full space-y-8 flex-shrink-0 ${style}`}>
            <h1 className='text-header font-LHeader'>Sign In</h1>
            <Box
                component="form"
                autoComplete="off"
                className='space-y-8'
            >
                <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth/>
                <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth/>
                <Button 
                    variant="contained" 
                    fullWidth
                    sx={{
                        backgroundColor: '#362D2D',
                        height: '3rem'
                    }}
                >
                    Sign In
                </Button>
            </Box>

            <div className='flex space-x-2'>
                <p>Don't have an account?</p>
                <p className='font-header cursor-pointer hover:underline' onClick={ setSignUp }>Sign Up!</p>
            </div>
        </div>
    )
}

export default SignInPanel
