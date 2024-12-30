import React from 'react'
import { TextField } from '@mui/material'

const RegisterPersonalInfo = () => {
  return (
    <div className='space-y-8 flex-shrink-0 w-full'>
      <TextField id="outlined-basic" label="Name" variant="outlined" fullWidth/>
      <TextField id="outlined-basic" label="Phone Number" variant="outlined" fullWidth/>
      <TextField id="outlined-basic" label="Address" variant="outlined" fullWidth/>
    </div>
  )
}

export default RegisterPersonalInfo
