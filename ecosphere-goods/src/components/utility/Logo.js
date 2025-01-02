import React from 'react'
import { MdOutlineCottage } from 'react-icons/md'

const Logo = () => {
  return (
    <div className="flex items-center space-x-2 text-header font-header cursor-pointer">
        <MdOutlineCottage className="w-10 h-10"/>
        <h1>Ecosphere Goods</h1>
    </div>
  )
}

export default Logo
