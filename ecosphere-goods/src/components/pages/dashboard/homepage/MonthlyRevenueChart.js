import React, { useEffect, useState } from 'react'
import { fetchMonthlyRevenueData } from '../../../../api/storeDataHandling'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS } from "chart.js/auto";

const MonthlyRevenueChart = () => {
    const [loading, setLoading] = useState(true)
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{ label: "", data: [] }],
    })

    useEffect(() => {
        const getMonhtlyRevenue = async () => {
            try {
                const data = await fetchMonthlyRevenueData()
                
                const dateLabels = data.map((entry) => entry.date)
                const revenueData = data.map((entry) => entry.revenue)

                setChartData({
                    labels: dateLabels,
                    datasets: [{
                        label: "Revenue ($)",
                        data: revenueData,
                    }],
                })

                setLoading(false)

            } catch (error) {
                console.error(error.message)
            }
        }

        getMonhtlyRevenue()
    }, [])

    console.log('Final data', chartData)

    return (
        <div className='flex flex-col gap-3 h-full'>
            <h1 className='text-dark-brown font-header text-lg'>Revenue of the past 30 Days</h1>
            {!loading && <Line data={chartData}/>}
        </div>
    )
}

export default MonthlyRevenueChart
