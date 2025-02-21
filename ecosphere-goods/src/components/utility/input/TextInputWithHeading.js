import React, { useState } from 'react'

const TextInputWithHeading = ({ label, placeholder, className, name, value='' }) => {
  const [inputVal, setInputVal] = useState(value)

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
        <label className='font-header'>{label}</label>
        
        <input 
            type="text" 
            className='text-dark-brown font-normal min-w-28 w-full p-4 rounded-md bg-transparent border-2 border-dark-brown border-opacity-15 focus:border-dark-brown focus:border-2 outline-none transition-all ease-in-out duration-100'
            placeholder={placeholder}
            name={name}
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
        />
    </div>
  )
}

export default TextInputWithHeading
