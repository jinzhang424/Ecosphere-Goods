import React from 'react'

const SettingsSection = ({ children, heading }) => {
  return (
    <div className='flex flex-col border-2 border-dark-brown border-opacity-20 p-8 rounded-2xl w-full'>
        <h1 className='text-xl font-header text-dark-brown'>{heading}</h1>
        <section className='flex flex-col mt-6 gap-4'>
          {children}
        </section>
    </div>
  )
}

export default SettingsSection
