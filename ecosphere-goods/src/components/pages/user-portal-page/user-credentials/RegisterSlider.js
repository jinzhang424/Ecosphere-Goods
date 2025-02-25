import React, {useState} from 'react'
import { FaCircle } from "react-icons/fa";
import ContainedBrownButton from '../utility/ContainedBrownButton';

const RegisterSlider = ({ children }) => {
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
                    {children.map((section, index) => (
                        <div key={ index } className='w-full flex-shrink-0'>
                            { section }
                        </div>
                    ))}
                </div>
            </div>
            
            <div className='flex justify-between'>
                <ContainedBrownButton onClick={prevSlide} label="Back"/>
                    <div className='flex items-center space-x-3'>
                        {children.map((_, index) => (
                            <FaCircle 
                                key={ index }
                                className={`h-3 w-3 transition-opacity duration-500 ${slide === index ? 'opacity-100' : 'opacity-70'}`}
                                color='#362D2D'
                            />
                        ))}
                    </div>
                <ContainedBrownButton onClick={nextSlide} label="Next"/>
            </div>
        </div>
    )
}

export default RegisterSlider
