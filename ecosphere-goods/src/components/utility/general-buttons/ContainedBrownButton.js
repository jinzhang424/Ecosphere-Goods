import React from 'react'
import Button from '@mui/material/Button';

const ContainedBrownButton = ({ clickAction, children }) => {
  return (
    <Button 
        onClick={clickAction}
        variant='contained'
        sx={{
            backgroundColor: '#362D2D'
        }}
    >
        {children}
    </Button>
  )
}

export default ContainedBrownButton
