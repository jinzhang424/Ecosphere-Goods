import React, {useState} from 'react'
import Button from '@mui/material/Button';
import RegisterEmail from './RegisterEmail';
import RegisterPersonalInfo from './RegisterPersonalInfo';
import { FaCircle } from "react-icons/fa";

const RegisterDetailsSlider = () => {
    const [slide, setSlide] = useState(0)
    
        const nextSlide = () => {
            if (slide < 1) {
                setSlide(slide + 1)
            }
        }
    
        const prevSlide = () => {
            if (slide > 0) {
                setSlide(slide - 1)
            }
        }

    return (
        <div className='space-y-8'>
            <div className='relative w-full overflow-hidden'>
                <div 
                    className='flex transition-transform duration-500 ease-in-out'
                    style={{ transform: `translateX(-${slide * 100}%)` }}
                >
                    <div className='w-full flex-shrink-0'>
                        <RegisterEmail />
                    </div>
                    <div className='w-full flex-shrink-0'>
                        <RegisterPersonalInfo />
                    </div>
                </div>
            </div>
            <div className='flex justify-between'>
                <Button 
                    onClick={prevSlide}
                    variant='contained'
                    sx={{
                        backgroundColor: '#362D2D'
                    }}
                >
                    Prev
                </Button>
                <div className='flex items-center space-x-3'>
                    <FaCircle 
                        className={`h-3 w-3 ${slide === 0 ? 'opacity-100' : 'opacity-70'}`}
                        color='#362D2D'
                    />
                    <FaCircle 
                        className={`h-3 w-3 ${slide === 1 ? 'opacity-100' : 'opacity-70'}`}
                        color='#362D2D'
                    />
                </div>
                <Button 
                    onClick={nextSlide}
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

export default RegisterDetailsSlider
