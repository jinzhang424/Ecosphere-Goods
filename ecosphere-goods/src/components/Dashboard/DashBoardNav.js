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
    const navLinkStyle = ''

    return (
        <div className='flex flex-col items-center justify-between h-full p-6 bg-off-white rounded-3xl pt-10 pb-10'>
            <div className='flex flex-col space-y-8'>
                <NavLink className={({ isActive }) => isActive && 'bg-dark-brown text-off-white rounded-xl' } to='dashboard/home'>
                    <IoIosHome className={ iconSize }/>
                </NavLink>

                <NavLink className={({ isActive }) => isActive && 'bg-dark-brown text-off-white rounded-xl' } to={`dashboard/${ isAdmin ? 'product-catalog' : 'past-orders'}`}>
                    { isAdmin ? <BsBoxes className={iconSize} /> : <GoChecklist className={ iconSize }/>}
                </NavLink>

                <NavLink className={({ isActive }) => isActive && 'bg-dark-brown text-off-white rounded-xl' } to='dashboard/settings'>
                    <FaCog className={ iconSize }/>
                </NavLink>
            </div>
            
            <div className='pt-7 border-t-2 border-dark-brown'>   
                <ImExit className={ iconSize }/>
            </div>
        </div>
    )
}

export default DashBoardNav
