import React, { useEffect, useState } from 'react'
import { fetchMonthlyRevenueData } from '../../../../../api/storeDataHandling'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS } from "chart.js/auto";
import { auth } from '../../../../../firebase';

const MonthlyRevenueChart = () => {
    const [loading, setLoading] = useState(true)
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{ label: "", data: [] }],
    })

    useEffect(() => {
        const getMonhtlyRevenue = async () => {
            try {
                const idToken = await auth.currentUser.getIdToken()
                const data = await fetchMonthlyRevenueData(idToken)
                
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

    return (
        <div className='flex flex-col gap-3 h-full'>
            <h1 className='text-dark-brown font-header text-lg'>Revenue of the past 30 Days</h1>
            {!loading && <Line data={chartData}/>}
        </div>
    )
}

export default MonthlyRevenueChart
