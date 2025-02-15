import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS } from "chart.js/auto";
import { auth } from '../../../../../firebase';
 import { fetchCategoricalSalesData } from '../../../../../api/storeDataHandling';

const CategoricalSalesChart = () => {
    const [formattedCategoricalSalesData, setformattedCategoricalSalesData] = useState({
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
                    label: categorySale.category,
                    data: categorySale.sales
                }))
            }

            setformattedCategoricalSalesData(formattedCategoricalSalesData)
        }

        getCategoricalSalesData()
    }, [])

    return (
        <div className='w-full h-full'>
            <Line data={formattedCategoricalSalesData}/>
        </div>
    )
}

export default CategoricalSalesChart
