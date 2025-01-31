import React from 'react'
import truck from '../../data/images/truck.gif'
import Logo from '../utility/Logo'

const TruckLoader = ({ isLoading }) => {
    return (
        <div className='pointer-events-none'>
            <div className={`absolute inset-0 bg-dark-brown z-30 ${isLoading ? '' : '-translate-y-full'} transition-transform ease-in duration-500`}></div>
            <div className={`absolute inset-0 bg-off-white z-40 flex flex-col ${isLoading ? '' : '-translate-y-full'} transition-transform ease-in duration-300`}>
                <div className='relative bottom-10 m-auto flex-col items-center'>
                    <img src={truck} alt="" className='w-36 m-auto'/>
                    <Logo />
                </div>
            </div>
        </div>
    )
}

export default TruckLoader
