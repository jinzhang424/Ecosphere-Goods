import React from 'react'

const PanelContainer = ({ children, icon, heading, bodyText }) => {
  return (
    <div className='flex flex-col w-full h-full items-center text-dark-brown justify-between flex-shrink-0 p-10'>
            <div className='rounded-full border-8 p-4 border-dark-brown'>
                {icon}
            </div>

            <h1 className='font-header text-header text-center'>{heading}</h1>

            <p className='text-center w-11/12'>{bodyText}</p>

            { children }
        </div>
  )
}

export default PanelContainer
