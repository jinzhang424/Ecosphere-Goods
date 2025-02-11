import React, { useState, useEffect } from 'react'
import { MdOutlineSpaceDashboard, MdLogout } from "react-icons/md";
import Menu from '@mui/material/Menu';
import { MdAccountCircle } from "react-icons/md";
import ProfileMenuItem from './ProfileMenuItem';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/userSlice';
import { auth } from '../../firebase';
import { sendEmailVerification } from 'firebase/auth';

const ProfileIconAndMenu = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = async (event) => {
        if (auth.currentUser?.emailVerified) {
            setAnchorEl(event.currentTarget);
        } else {
            await sendEmailVerification(auth.currentUser)
            navigate('/verification')
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const navigateToDashboard = () => {
        navigate('/dashboard/home')
    }

    const logoutClick = () => {
        dispatch(logout())
        navigate('/user-portal')
    }

    useEffect(() => {
        const handleScroll = () => {
            handleClose()
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

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
                <ProfileMenuItem onClick={logoutClick} label='Logout' color='red-700'>
                    <MdLogout/>
                </ProfileMenuItem>
            </Menu>
        </div>
    );
}

export default ProfileIconAndMenu
