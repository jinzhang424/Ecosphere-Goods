import React from 'react'
import MonthlyRevenueChart from './adminInfoCharts/MonthlyRevenueChart'
import CategoricalSalesChart from './adminInfoCharts/CategoricalSalesChart'
import ProductSalesChart from './adminInfoCharts/ProductSalesChart'

const AdminDashBoard = () => {
  return (
    <div className='w-full h-full'>
        <div className='flex gap-8 h-1/2 pb-4'>
            <section className='bg-off-white w-1/2 h-full rounded-3xl p-8 flex-grow'>
                <MonthlyRevenueChart/>
            </section>

            <section className='bg-off-white w-1/2 h-full rounded-3xl p-8 flex-grow'>
                <CategoricalSalesChart/>
            </section>
        </div>

        <div className='grid grid-cols-3 h-1/2 gap-8 pt-4 w-full'>
            <section className='aspect-square h-full bg-off-white rounded-3xl p-8 flex-grow'>
                <ProductSalesChart/>
            </section>

            <section className='aspect-square h-full bg-off-white rounded-3xl p-8 flex-grow'>
                Most Revenue (Bar chart top 10)
            </section>

            <section className='aspect-square h-full bg-off-white rounded-3xl p-8 flex-grow'>
                User Traffic (Line chart)
            </section>
        </div>
    </div>
  )
}

export default AdminDashBoard
