import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PasswordTextField from './PasswordTextField';
import { registerUser } from '../../utilityFunctions/userAuth';
import { toast } from 'react-toastify';

const RegisterEmail = ({ backToSignIn }) => {
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

  const onRegister = async () => {
    try {
      await registerUser(email, password, passwordMatch);

      // Resetting the state and moving the user to sign in
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      backToSignIn();
    } catch (error) {
      toast.error(error.message);
    }
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
          value={ email }
          onChange={(e) => setEmail(e.target.value)}
        />
        <PasswordTextField 
          label="Password" 
          setPassword={ handlePasswordChange } 
          value={ password }
        />
        <div className='w-full space-y-2'>
          <PasswordTextField 
            label="Confirm Password" 
            setPassword={ handleConfirmPasswordChange }
            value={ confirmPassword }
          />
          <p className={`${(!passwordMatch && confirmPassword !== '') ? 'opacity-100' : 'opacity-0'} text-error`}>* Password does not match!</p>
        </div>
      </Box>
      <Button 
          variant="contained" 
          fullWidth
          onClick={ onRegister }
          sx={{
              backgroundColor: '#362D2D',
              height: '3rem',
              width: '60%',
          }}
      >
        Sign Up
      </Button>
    </div>
  )
}

export default RegisterEmail
