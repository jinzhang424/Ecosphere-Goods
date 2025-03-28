import React from 'react'
import RecentOrders from './RecentOrders';
import UserProfileCard from './UserProfileCard'

const UserDashBoard = () => {

    return (
        <div className='flex w-full h-full space-x-8'>

            <div className='flex flex-col h-full w-7/12'>
                <section className='bg-off-white w-full h-1/2 flex flex-col rounded-3xl p-8 text-dark-brown'>
                    <UserProfileCard/>
                </section>

                <div className='flex space-x-8 h-1/2 mt-8'>
                    <section className='bg-off-white w-1/2 h-full rounded-3xl p-8'>
                        dwad
                    </section>
                    
                    <section className='bg-off-white w-1/2 h-full rounded-3xl p-8'>
                        dwad
                    </section>
                </div>
            </div>

            <section className='flex w-5/12 bg-off-white h-full rounded-3xl p-8'>
                <RecentOrders/>
            </section>
        </div>
    )
}

export default UserDashBoard
