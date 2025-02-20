import React, { useEffect, useState } from 'react'
import { fetchMonthlyRevenueData } from '../../../../../api/storeDataHandling'
import Chart from '../../../../utility/charts/Chart';
import { auth } from '../../../../../firebase';

const MonthlyRevenueChart = () => {
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
                        fill: true,
                        label: "Revenue ($)",
                        data: revenueData,
                    }],
                })

            } catch (error) {
                console.error(error.message)
            }
        }

        getMonhtlyRevenue()
    }, [])

    return (
        <>
            <Chart 
                data={chartData} 
                title="Revenue of the past 30 Days" 
                type="line" 
            />
        </>
    )
}

export default MonthlyRevenueChart
