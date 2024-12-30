import React from 'react'
import { IoMdSearch } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { NavLink } from 'react-router-dom'
import Logo from '../utility/Logo';
import { useState, useEffect } from 'react';
import { MdAccountCircle } from "react-icons/md";


const Navbar = () => {
  const [show, handleShow] = useState(true);
  
  const transitionNavBar = () => {
    if (window.scrollY > 250) {
      handleShow(false);
    } else {
      handleShow(true);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => window.removeEventListener("scroll", transitionNavBar);
  }, [])

  return (
    <div className={`fixed top-0 left-0 right-0 z-10 flex justify-between items-center bg-off-white p-8 w-full text-dark-brown transition-opacity ease-in-out duration-200 ${show ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="ml-4">
        <Logo/>
      </div>

      <div className="flex items-center space-x-8 text-subtitle mr-4 transition-">
        <NavLink 
          to="/"
          className="hover:underline duration-300 ease-in-out">
            Home
        </NavLink>

        <NavLink 
          to="/products" 
          className="hover:underline duration-300 ease-in-out">
            Products
        </NavLink>

        <NavLink className="hover:underline duration-300 ease-in-out">About Us</NavLink>
        <IoCartOutline className="w-7 h-7 cursor-pointer"/>
        <NavLink to='/user-portal'><MdAccountCircle className="w-7 h-7 cursor-pointer"/></NavLink>
        <IoMdSearch className="w-7 h-7 cursor-pointer"/>
      </div>
    </div>
  )
}

export default Navbar
