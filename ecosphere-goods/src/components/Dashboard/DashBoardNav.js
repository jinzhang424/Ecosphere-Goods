import React from 'react'
import { IoIosHome } from "react-icons/io";
import { GoChecklist } from "react-icons/go";
import { ImExit } from "react-icons/im";
import { FaCog } from "react-icons/fa";
import { BsBoxes } from "react-icons/bs";
import { NavLink } from 'react-router-dom';

const DashBoardNav = () => {
    const iconSize = 'w-10 h-10'
    const isAdmin = true;
    const activeNavLinkStyle = 'bg-light-brown text-off-white rounded-lg p-1'
    const inactiveNavLinkStyle = 'hover:bg-light-brown hover:text-off-white rounded-lg transition-colors ease-in-out duration-500 p-1 text-dark-brown'

    return (
        <div className='flex flex-col items-center justify-between h-full p-6 bg-off-white rounded-3xl pt-10 pb-10'>
            <div className='flex flex-col space-y-8'>
                <NavLink className={({ isActive }) => isActive ? activeNavLinkStyle : inactiveNavLinkStyle } to='/dashboard/home'>
                    <IoIosHome className={ iconSize }/>
                </NavLink>

                <NavLink className={({ isActive }) => isActive ? activeNavLinkStyle : inactiveNavLinkStyle } to={`/dashboard/${ isAdmin ? 'product-catalog' : 'past-orders'}`}>
                    { isAdmin ? <BsBoxes className={iconSize} /> : <GoChecklist className={ iconSize }/>}
                </NavLink>

                <NavLink className={({ isActive }) => isActive ? activeNavLinkStyle : inactiveNavLinkStyle } to='/dashboard/settings'>
                    <FaCog className={ iconSize }/>
                </NavLink>
            </div>
            
            <div className='pt-7 border-t-2 border-light-brown'>   
                <NavLink className='h-fit text-dark-brown'>
                    <ImExit className={ iconSize }/>
                </NavLink>
            </div>
        </div>
    )
}

export default DashBoardNav
