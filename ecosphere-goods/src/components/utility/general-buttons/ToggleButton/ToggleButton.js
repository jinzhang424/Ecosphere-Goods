import React from 'react'

const ToggleButton = ({ children, selected, id, onClick }) => {
    return (
        <button 
            className={`flex items-center justify-center gap-2 font-header text-dark-brown border-b-2 border-dark-brown p-2 pl-3 pr-3 border-opacity-20 ${selected === id && 'border-opacity-100'} transition-all ease-in-out duration-300`}
            onClick={() => onClick(id)}
        >
            {children}
        </button>
    )
}

export default ToggleButton
