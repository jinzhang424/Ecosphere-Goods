import React, { useState } from 'react'
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const PasswordTextField = ({ label, setPassword }) => {
const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <FormControl variant="outlined" fullWidth>
        <InputLabel htmlFor="outlined-adornment-password" fullWidth>{ label }</InputLabel>
        <OutlinedInput
            onChange={(e) => (setPassword(e.target.value))}
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        aria-label={
                            showPassword ? 'hide the password' : 'display the password'
                        }
                        onClick={handleClickShowPassword}
                        edge="end"
                    >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
            }
            label={ label }
        />
    </FormControl>
  )
}

export default PasswordTextField
