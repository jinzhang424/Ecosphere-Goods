import React, { useEffect, useState } from 'react'
import { fetchMonthlyRevenueData } from '../../../../../api/storeDataHandling'
import { Bar } from 'react-chartjs-2'
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
        <>
            <Bar 
                data={chartData}
                options={{
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Revenue of the past 30 Days',
                            font: {
                                size: 18,
                            },
                            color: "#362D2D"
                        }
                    }
                }}
            />
        </>
    )
}

export default MonthlyRevenueChart
