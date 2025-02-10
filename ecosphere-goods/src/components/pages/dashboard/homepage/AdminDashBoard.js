import React from 'react'

const AdminDashBoard = () => {
  return (
    <div className='w-full h-full'>
        <div className='flex space-x-8 h-1/2 pb-4'>
            <section className='bg-off-white w-1/2 h-full rounded-3xl p-8 flex-grow'>
                Profit (TBC)
            </section>

            <section className='bg-off-white w-1/2 h-full rounded-3xl p-8 flex-grow'>
                User Traffic (TBC)
            </section>
        </div>

        <div className='flex h-1/2 space-x-8 pt-4'>
            <section className='aspect-square h-full bg-off-white rounded-3xl p-8 flex-grow'>
                Most Sales (TBC)
            </section>

            <section className='aspect-square h-full bg-off-white rounded-3xl p-8 flex-grow'>
                Most Sold (TBC)
            </section>

            <section className='aspect-square h-full bg-off-white rounded-3xl p-8 flex-grow'>
                TBD (TBC)
            </section>
        </div>
    </div>
  )
}

export default AdminDashBoard
