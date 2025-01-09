import React from 'react'
import { FiPlus, FiMinus } from "react-icons/fi";

const QuantityAdjuster = ({ increment, decrement, quantity, className='rounded-md bg-off-white overflow-hidden' }) => {
    
    return (
        <div className={ className }>
            <div className='flex justify-between items-center space-x-3'>
                <button 
                    className=' bg-dark-brown bg-opacity-0 p-2 border-r-2 border-dark-brown border-opacity-20 hover:bg-opacity-10 transition ease-in-out duration-300'
                    onClick={decrement}
                >
                    <FiMinus/>
                </button>

                <p className='aspect-1/1'>{ quantity }</p>

                <button 
                    className='bg-dark-brown bg-opacity-0 p-2 border-l-2 border-dark-brown border-opacity-20 hover:bg-opacity-10 transition ease-in-out duration-300'
                    onClick={increment}
                >
                    <FiPlus/>
                </button>
            </div>
        </div>
    )
}

export default QuantityAdjuster
