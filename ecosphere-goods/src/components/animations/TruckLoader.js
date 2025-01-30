import React from 'react'
import truck from '../../data/images/truck.gif'
import Logo from '../utility/Logo'

const TruckLoader = () => {
    return (
        <div className='absolute inset-0 bg-off-white z-40 flex flex-col'>
            <div className='relative bottom-10 m-auto flex-col items-center'>
                <img src={truck} alt="" className='w-36 m-auto'/>
                <Logo />
            </div>
        </div>
    )
}

export default TruckLoader
