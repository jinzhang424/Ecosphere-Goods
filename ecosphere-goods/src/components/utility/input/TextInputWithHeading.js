import React from 'react'
import TextInput from './TextInput'

const TextInputWithHeading = ({ heading, placeholder, className, name }) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
        <label className='font-header'>{heading}</label>
        <TextInput placeholder={placeholder} name={name}/>
    </div>
  )
}

export default TextInputWithHeading
