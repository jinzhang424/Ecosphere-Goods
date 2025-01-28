import React from 'react'
import { CgProfile } from "react-icons/cg";
import OrderTracker from './OrderTracker';

const UserDashBoard = () => {

    return (
        <div className='w-full h-full'>
            <div className='flex space-x-8 h-1/2 pb-4 w-full'>
                <section className='bg-off-white w-5/12 flex flex-col rounded-3xl p-8 text-dark-brown space-y-2'>
                    
                    <div className='flex space-x-8'>
                        <CgProfile className='h-24 w-24'/>
                        <div className='flex flex-col'>
                            <span className='font-header text-header'>Jimbob Joe</span>
                            <span className='font-header text-subtitle opacity-80'>7 Jimbob St</span>
                        </div>
                    </div>
                    <span>Your pts</span>
                </section>

                <section className='bg-off-white w-7/12 h-full rounded-3xl p-8'>
                    <OrderTracker/>
                </section>
            </div>

            <div className='flex h-1/2 space-x-8 pt-4'>
                <section className='aspect-square h-full bg-off-white rounded-3xl p-8'>
                    Past Orders (TBC)
                </section>

                <section className='aspect-square h-full bg-off-white rounded-3xl p-8'>
                Past Orders (TBC)
                </section>

                <section className='aspect-square h-full bg-off-white rounded-3xl p-8 flex-grow'>
                    Past Orders (TBC)
                </section>
            </div>
        </div>
    )
}

export default UserDashBoard
