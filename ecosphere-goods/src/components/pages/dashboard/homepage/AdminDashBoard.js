import React from 'react'
import MonthlyRevenueChart from './adminInfoCharts/MonthlyRevenueChart'
import CategoricalSalesChart from './adminInfoCharts/CategoricalSalesChart'
import ProductSalesChart from './adminInfoCharts/ProductSalesChart'
import ProductRevenueChart from './adminInfoCharts/ProductRevenueChart'
import UserTrafficChart from './adminInfoCharts/UserTrafficChart'

const AdminDashBoard = () => {
    return (
        <div className='flex flex-col gap-8 w-full h-fit'>
            <div className='flex gap-8 h-1/2'>
                <section className='flex bg-off-white w-1/2 h-full rounded-3xl p-8 flex-grow'>
                    <MonthlyRevenueChart/>
                </section>

                <section className='flex bg-off-white w-1/2 h-full rounded-3xl p-8 flex-grow'>
                    <CategoricalSalesChart/>
                </section>
            </div>

            <div className='grid grid-cols-3 h-1/2 gap-8 w-full'>
                <section className='aspect-square h-full bg-off-white rounded-3xl p-8 flex-grow'>
                    <ProductSalesChart/>
                </section>

                <section className='aspect-square h-full bg-off-white rounded-3xl p-8 flex-grow'>
                    <ProductRevenueChart/>
                </section>

                <section className='aspect-square h-full bg-off-white rounded-3xl p-8 flex-grow'>
                    <UserTrafficChart/>
                </section>
            </div>
        </div>
    )
}

export default AdminDashBoard
