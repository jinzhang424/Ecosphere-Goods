import React from 'react'
import { IoIosHome } from "react-icons/io";
import { GoChecklist } from "react-icons/go";
import { ImExit } from "react-icons/im";
import { FaCog } from "react-icons/fa";

const DashBoardNav = () => {
    const iconSize = 'w-10 h-10'

    return (
        <div className='flex flex-col items-center justify-between h-full p-6 bg-off-white rounded-3xl pt-10 pb-10'>
            <div className='space-y-8'>
                <IoIosHome className={ iconSize }/>
                <GoChecklist className={ iconSize }/>
                <FaCog className={ iconSize }/>
            </div>
            <div className='pt-7 border-t-2 border-dark-brown'>   
                <ImExit className={ iconSize }/>
            </div>
        </div>
    )
}

export default DashBoardNav
