import React, { useState } from 'react'
import { MdOutlineSpaceDashboard, MdLogout } from "react-icons/md";
import Menu from '@mui/material/Menu';
import { MdAccountCircle } from "react-icons/md";
import ProfileMenuItem from './ProfileMenuItem';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const ProfileIconAndMenu = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const navigateToDashboard = () => {
        navigate('/dashboard/home')
    }

    const logout = () => {
        dispatch(logout())
        navigate('/user-portal')
    }

    return (
        <div className='flex relative z-0'>
            <button
                className='h-fit'
                onClick={handleClick}
            >
                <MdAccountCircle className="w-7 h-7 cursor-pointer text-dark-brown"/>
            </button>
            <Menu
                className='mt-4'
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                disableScrollLock
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <ProfileMenuItem onClick={navigateToDashboard} label='Dashboard'>
                    <MdOutlineSpaceDashboard/>
                </ProfileMenuItem>
                <ProfileMenuItem onClick={logout} label='Logout' color='red-700'>
                    <MdLogout/>
                </ProfileMenuItem>
            </Menu>
        </div>
    );
}

export default ProfileIconAndMenu
