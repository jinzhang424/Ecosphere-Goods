import React, { useState, useEffect } from 'react'
import { MdOutlineSpaceDashboard, MdLogout } from "react-icons/md";
import Menu from '@mui/material/Menu';
import { MdAccountCircle } from "react-icons/md";
import ProfileMenuItem from './ProfileMenuItem';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../../features/userSlice';
import { auth } from '../../firebase';
import { sendEmailVerification } from 'firebase/auth';
import { toast } from 'react-toastify';

const ProfileIconAndMenu = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const user = useSelector(selectUser)

    /**
     * Sends users a verification email and to the verification page 
     */
    const sendToVerification = async () => {
        await sendEmailVerification(auth.currentUser)
        .then(() => navigate('/verification'))
        .catch((error) => {
            toast.error(error.message)
        })
    }
    
    /**
     * Opens up the drop down menu when click or sends user to the verification page depending on whether they're logged in or not
     * @param {*} event 
     */
    const handleClick = async (event) => {
        if (user) {
            setAnchorEl(event.currentTarget);
        } else {
            sendToVerification()
        }
    };

    /**
     * Closes the dropdown menu selector
     */
    const handleClose = () => {
        setAnchorEl(null);
    };

    /**
     * Sends the user to their dashboard or the verification page depending on whether they're verified or not
     */
    const navigateToDashboard = async () => {
        if (auth.currentUser?.emailVerified) {
            navigate('/dashboard/home')
        } else {
            sendToVerification()
        }
    }

    const logoutClick = () => {
        dispatch(logout())
        navigate('/user-portal')
    }

    /** Listens for scrolling and closes the drop down menu upon scrolling */
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
