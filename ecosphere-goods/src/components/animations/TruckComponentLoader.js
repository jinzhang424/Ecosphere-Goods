import React from 'react'
import Logo from '../utility/Logo'
import truck from '../../data/images/truck.gif'

const TruckComponentLoader = ({ loading = false }) => {

    return (
        <div className={`absolute object-center inset-0 z-40 h-full  ${loading ? '' : 'opacity-0'} transition-opacity ease-in duration-300 bg-off-white`}>
            <div className='relative top-10 inset-0 flex flex-col h-full'>
                <div className='relative m-auto flex-col items-center'>
                    <img src={truck} alt="" className='w-36 m-auto'/>
                    <Logo />
                </div>
            </div>
        </div>
    )
}

export default TruckComponentLoader
