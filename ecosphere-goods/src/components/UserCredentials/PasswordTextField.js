import React, { useState } from 'react'
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const PasswordTextField = ({ label, setPassword, value }) => {
const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <FormControl variant="outlined" fullWidth>
        <InputLabel htmlFor="outlined-adornment-password">{ label }</InputLabel>
        <OutlinedInput
            onChange={(e) => (setPassword(e.target.value))}
            value={ value }
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
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
