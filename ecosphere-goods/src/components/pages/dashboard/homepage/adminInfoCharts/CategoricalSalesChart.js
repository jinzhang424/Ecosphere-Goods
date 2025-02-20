import React, { useEffect, useState } from 'react'
import Chart from '../../../../utility/charts/Chart';
import { auth } from '../../../../../firebase';
 import { fetchCategoricalSalesData } from '../../../../../api/storeDataHandling';

const CategoricalSalesChart = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{ label: "", data: [] }],
    })

    useEffect(() => {
        const getCategoricalSalesData = async () => {
            const idToken = await auth.currentUser.getIdToken()
            const categoricalSalesData = await fetchCategoricalSalesData(idToken)

            const formattedCategoricalSalesData = {
                labels: categoricalSalesData.dates,
                datasets: categoricalSalesData.categorySalesData.map((categorySale) => ({
                    fill: true,
                    label: categorySale.category,
                    data: categorySale.sales
                }))
            }

            setChartData(formattedCategoricalSalesData)
        }

        getCategoricalSalesData()
    }, [])

    return (
        <>
            <Chart 
                key={"CategoricalSalesChart"} 
                data={chartData} title="Categorical Sales data of path 12 months" 
                type="line"
            />
        </>
    )
}

export default CategoricalSalesChart
