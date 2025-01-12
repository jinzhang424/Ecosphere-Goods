import React from 'react'
import { IoMdSearch } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { NavLink, Link } from 'react-router-dom'
import Logo from '../utility/Logo';
import { useState, useEffect } from 'react';
import { MdAccountCircle } from "react-icons/md";
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';

const Navbar = () => {
  const user = useSelector(selectUser)

  const [show, handleShow] = useState(true);
  const navLinkStyle = ({ isActive }) => isActive ? 'text-off-white bg-dark-brown p-2 pl-4 pr-4 rounded-md' : 'hover:bg-dark-brown hover:text-off-white transition-colors ease-in-out duration-300 p-2 pl-4 pr-4 rounded-md'
  
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
      <Link className="ml-4" to="/">
        <Logo/>
      </Link>

      <div className="flex items-center space-x-8 text-subtitle mr-4 transition-">
        <NavLink 
          to="/"
          className={navLinkStyle}>
            Home
        </NavLink>

        <NavLink 
          to="/products" 
          className={navLinkStyle}>
            Products
        </NavLink>

        <NavLink 
          to='/about-us' 
          className={navLinkStyle}>
            About Us
        </NavLink>

        <NavLink to='/shopping-cart'>
            <IoCartOutline className="w-7 h-7 cursor-pointer"/>
        </NavLink>
        
        <NavLink to={`${user ? `profile/${user.uid}` : '/user-portal'}`}>
          <MdAccountCircle className="w-7 h-7 cursor-pointer"/>
        </NavLink>
        
        <IoMdSearch className="w-7 h-7 cursor-pointer"/>
      </div>
    </div>
  )
}

export default Navbar
