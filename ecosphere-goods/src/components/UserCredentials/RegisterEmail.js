import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PasswordTextField from './PasswordTextField';
import { auth } from '../../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const RegisterEmail = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordMatch, setPasswordMatch] = useState('')

  const handlePasswordChange = (newPassword) => {
    setPassword(newPassword);
    setPasswordMatch(newPassword === confirmPassword);
  };

  const handleConfirmPasswordChange = (newPassword) => {
    setConfirmPassword(newPassword);
    setPasswordMatch(password === newPassword);
  };

  const registerUser = () => {
    createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).then((authUser) => {
      console.log(authUser)
      toast.success('Account Successfully Created!');
      setEmail('')
      setPassword('')
      setConfirmPassword('')
    }).catch((error) => {
      toast.error(error.message);
    })
  }

  return (
    <div className='flex flex-col items-center space-y-8 flex-shrink-0 w-full'>
      <Box
        component="form"
        className='space-y-8'
        noValidate
        sx={{
          width: '100%'
        }}
      >
        <TextField 
          id="outlined-basic" 
          label="Email" 
          variant="outlined" 
          fullWidth
          onChange={(e) => setEmail(e.target.value)}
        />
        <PasswordTextField label="Password" setPassword={ handlePasswordChange }/>
        <div className='w-full space-y-2'>
          <PasswordTextField label="Confirm Password" setPassword={ handleConfirmPasswordChange }/>
          <p className={`${(!passwordMatch && confirmPassword !== '') ? 'opacity-100' : 'opacity-0'} text-error`}>* Password does not match!</p>
        </div>
      </Box>
      <Button 
          variant="contained" 
          fullWidth
          onClick={ registerUser }
          sx={{
              backgroundColor: '#362D2D',
              height: '3rem',
              width: '60%',
          }}
      >
        Sign Up
      </Button>
      <ToastContainer />
    </div>
  )
}

export default RegisterEmail
