import React, { useState, useEffect } from 'react'
import heroSliderData from '../data/heroSliderData.json';
import { FaCircle } from "react-icons/fa";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % heroSliderData.length)
        }, 8000)

        return () => clearInterval(interval);
    }, [])

    const nextSlide = () => {
        setCurrentSlide((currentSlide + 1) % heroSliderData.length) 
    }

    const prevSlide = () => {
        setCurrentSlide((currentSlide - 1 + heroSliderData.length) % heroSliderData.length)
    }

    return (
        <div className='relative z-1 h-screen overflow-hidden text-dark-brown'>
            <div 
                className="absolute inset-0 flex transition-transform duration-1000 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {heroSliderData.map((slide, index) => (
                    <div 
                        key={index} 
                        className="w-full flex-shrink-0"
                        style={{ 
                            backgroundImage: `url(${slide.url})`, 
                            backgroundSize: 'cover', 
                            backgroundPosition: 'center' 
                        }}
                    >
                    </div>
                ))}
            </div>
            <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-6 p-4">
                {heroSliderData.map((_, index) => (
                <FaCircle 
                    className={`cursor-pointer w-3 ${index === currentSlide ? 'opacity-100' : 'opacity-70'}`}
                    onClick={() => setCurrentSlide(index)}
                />
                ))}
            </div>
            <div className="flex absolute justify-between align-middle top-1/2 space-x-6 p-8 w-screen">
                <CiCircleChevLeft 
                    className="cursor-pointer w-11 h-11 opacity-50 hover:opacity-100 text-dark-brown"
                    onClick={prevSlide}
                />
                <CiCircleChevRight 
                    className="cursor-pointer w-11 h-11 opacity-50 hover:opacity-100 text-dark-brown"
                    onClick={nextSlide}
                />
            </div>
        </div>
    )
}

export default Hero
