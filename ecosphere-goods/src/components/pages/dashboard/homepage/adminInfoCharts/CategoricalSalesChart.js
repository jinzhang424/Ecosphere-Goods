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
        <>
            <Line 
                data={formattedCategoricalSalesData} 
                options={{
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Categorical Sales data of path 12 months',
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

export default CategoricalSalesChart
