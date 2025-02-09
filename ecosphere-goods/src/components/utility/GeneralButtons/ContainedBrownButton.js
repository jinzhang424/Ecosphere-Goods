import React from 'react'
import Button from '@mui/material/Button';

const ContainedBrownButton = ({ clickAction, label }) => {
  return (
    <Button 
        onClick={clickAction}
        variant='contained'
        sx={{
            backgroundColor: '#362D2D'
        }}
    >
        {label}
    </Button>
  )
}

export default ContainedBrownButton
