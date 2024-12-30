import React from 'react'
import Button from '@mui/material/Button';
import RegisterEmail from './RegisterEmail';
import RegisterPersonalInfo from './RegisterPersonalInfo';

const RegisterPanel = ({ style='' }) => {
  return (
    <div className={`w-full flex-shrink-0 ${style} space-y-8 overflow-hidden`}>
        <h1 className='font-LHeader text-header'>Register</h1>
        <div className='flex'>
            <RegisterEmail/>
            <RegisterPersonalInfo/>
        </div>
        <div className='flex justify-between'>
            <Button 
                variant='contained'
                sx={{
                    backgroundColor: '#362D2D'
                }}
            >
                Prev
            </Button>
            <Button 
                variant='contained'
                sx={{
                    backgroundColor: '#362D2D'
                }}
            >
                Next
            </Button>
        </div>
    </div>
  )
}

export default RegisterPanel
