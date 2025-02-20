import React, { useEffect, useState } from 'react'
import { fetchUserTraffic } from '../../../../../api/storeDataHandling'
import Chart from '../../../../utility/charts/Chart';
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
            <Chart data={chartData} title="Product revenue of current month" type="bar" maintainAspectRatio={false}/>
        </>
    )
}

export default UserTrafficChart
