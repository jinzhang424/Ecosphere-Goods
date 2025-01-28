import React from 'react'
import { CgProfile } from "react-icons/cg";
import RecentOrders from './RecentOrders';

const UserDashBoard = () => {

    return (
        <div className='flex w-full h-full space-x-8'>
            <div className='flex flex-col h-full w-7/12 space-y-8'>
                <section className='bg-off-white w-full h-1/2 flex flex-col rounded-3xl p-8 text-dark-brown space-y-2'>
                    
                    <div className='flex space-x-8'>
                        <CgProfile className='h-24 w-24'/>
                        <div className='flex flex-col'>
                            <span className='font-header text-header'>Jimbob Joe</span>
                            <span className='font-header text-subtitle opacity-80'>7 Jimbob St</span>
                        </div>
                    </div>
                    <span>Your pts</span>
                </section>

                <div className='flex space-x-8 h-1/2'>
                    <section className='bg-off-white w-1/2 h-full rounded-3xl p-8'>
                        dwad
                    </section>
                    
                    <section className='bg-off-white w-1/2 h-full rounded-3xl p-8'>
                        dwad
                    </section>
                </div>
            </div>

            <section className='flex w-5/12 bg-off-white w h-full rounded-3xl p-8'>
                <RecentOrders/>
            </section>
        </div>
    )
}

export default UserDashBoard
