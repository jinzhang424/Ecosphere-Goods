import React from 'react'
import TextInput from './TextInput'

const TextInputWithHeading = ({ heading, placeholder, className }) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
        <h2 className='font-header'>{heading}</h2>
        <TextInput placeholder={placeholder}/>
    </div>
  )
}

export default TextInputWithHeading
