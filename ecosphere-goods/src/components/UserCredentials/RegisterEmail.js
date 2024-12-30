import React from 'react'
import { TextField } from '@mui/material'

const RegisterEmail = () => {
  return (
    <div className='space-y-8 flex-shrink-0 w-full'>
      <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth/>
      <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth/>
      <TextField id="outlined-basic" label="Confirm Password" variant="outlined" fullWidth/>
    </div>
  )
}

export default RegisterEmail
