import React, { useEffect, useState } from 'react'
import { IoIosHome } from "react-icons/io";
import { GoChecklist } from "react-icons/go";
import { ImExit } from "react-icons/im";
import { FaCog } from "react-icons/fa";
import { BsBoxes } from "react-icons/bs";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { fetchRole } from '../../utilityFunctions/userAuth'
import { toast } from 'react-toastify';

const DashBoardNav = () => {
    const user = useSelector(selectUser)
    const [userRole, setUserRole] = useState('')
    const iconSize = 'w-10 h-10'
    const activeNavLinkStyle = 'bg-light-brown text-off-white rounded-lg p-1'
    const inactiveNavLinkStyle = 'hover:bg-light-brown hover:text-off-white rounded-lg transition-colors ease-in-out duration-500 p-1 text-dark-brown'
    const currentLocation = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                if (!user) {
                    navigate('/insufficient-permissions')
                }
    
                const role = await fetchRole(user.uid)
                setUserRole(role)
            } catch(error) {
                console.log(error.message)
                toast.error('An error has occurred.')
            }
        }

        fetchUserRole()
    }, [user])

    if (currentLocation.pathname.includes('admin') && userRole !== 'admin') {
        navigate('/insufficient-permissions')
    }

    return (
        <div className='flex flex-col items-center justify-between h-full p-5 bg-off-white rounded-3xl pt-10 pb-10'>
            <div className='flex flex-col space-y-8'>
                <NavLink className={({ isActive }) => isActive ? activeNavLinkStyle : inactiveNavLinkStyle } to='home'>
                    <IoIosHome className={ iconSize }/>
                </NavLink>

                <NavLink className={({ isActive }) => isActive ? activeNavLinkStyle : inactiveNavLinkStyle } to='orders'>
                    <GoChecklist className={ iconSize }/>
                </NavLink>

                { userRole === 'admin' && 
                    <NavLink className={({ isActive }) => isActive ? activeNavLinkStyle : inactiveNavLinkStyle } to={ userRole === 'admin' ? '/dashboard/admin/product-catalog' : 'insufficient-permissions' }>
                        <BsBoxes className={iconSize} />
                    </NavLink>
                }

                <NavLink className={({ isActive }) => isActive ? activeNavLinkStyle : inactiveNavLinkStyle } to='/dashboard/settings'>
                    <FaCog className={ iconSize }/>
                </NavLink>
            </div>
            
            <div className='flex pt-5 mt-48 border-t-2 border-light-brown items-center justify-center'>
                <NavLink className={`${inactiveNavLinkStyle} pt-2 pl-2`} to='/'>
                    <ImExit className={ iconSize }/>
                </NavLink>
            </div>
        </div>
    )
}

export default DashBoardNav
