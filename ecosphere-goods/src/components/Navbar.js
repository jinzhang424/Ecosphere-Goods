import React from 'react'
import { MdOutlineCottage } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { NavLink } from 'react-router-dom'


const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-10 flex justify-between items-center bg-off-white p-8 w-full text-dark-brown">
      <div className="flex items-center space-x-2 text-header font-header ml-4 cursor-pointer">
        <MdOutlineCottage className="w-10 h-10"/>
        <h1>Ecosphere Goods</h1>
      </div>

      <div className="flex items-center space-x-8 text-subtitle mr-4 transition-">
        <NavLink className="hover:underline duration-300 ease-in-out">Home</NavLink>
        <NavLink className="hover:underline duration-300 ease-in-out">Products</NavLink>
        <NavLink className="hover:underline duration-300 ease-in-out">About Us</NavLink>
        <IoCartOutline className="w-7 h-7"></IoCartOutline>
        <IoMdSearch className="w-7 h-7"></IoMdSearch>
      </div>
    </div>
  )
}

export default Navbar
