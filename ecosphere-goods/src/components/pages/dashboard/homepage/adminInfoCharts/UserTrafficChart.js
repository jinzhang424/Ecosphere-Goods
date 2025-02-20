import React, { useEffect, useState } from 'react'
import { fetchUserTraffic } from '../../../../../api/storeDataHandling'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, plugins, Title } from "chart.js/auto";
import { auth } from '../../../../../firebase';

const UserTrafficChart = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{ label: "", data: [] }]
    })

    useEffect(() => {
        
        const getUserTraffic = async () => {
            try {
                const idToken = await auth.currentUser.getIdToken()
                const userTrafficData = await fetchUserTraffic(idToken)

                console.log('BER HERE', userTrafficData)

                setChartData({
                    labels: userTrafficData.dates,
                    datasets: [{
                        label: "User traffic",
                        data: userTrafficData.userTraffic
                    }]
                })
            } catch (error) {
                console.log(error.message)
            }
        }

        getUserTraffic()
    }, [])

    return (
        <>
            <Bar 
                data={chartData} 
                options={{
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'User traffic in the past 12 months',
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

export default UserTrafficChart
