import React, { useEffect, useState } from 'react'
import { fetchProductSalesData } from '../../../../../api/storeDataHandling'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, plugins, Title } from "chart.js/auto";
import { auth } from '../../../../../firebase';

const ProductSalesChart = () => {
    const [loading, setLoading] = useState(true)
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{ label: "", data: [] }],
    })

    useEffect(() => {
        const getProductSales = async () => {
            try {
                const idToken = await auth.currentUser.getIdToken()
                const data = await fetchProductSalesData(idToken)
                
                const dateLabels = data.productNames
                const productSalesData = data.productSales

                setChartData({
                    labels: dateLabels,
                    datasets: [{
                        label: "Revenue ($)",
                        data: productSalesData,
                    }],
                })

                setLoading(false)

            } catch (error) {
                console.error(error.message)
            }
        }

        getProductSales()
    }, [])

    return (
        <>
            <Pie 
                data={chartData} 
                options={{ 
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Product Sales of current month',
                            font: {
                                size: 18,
                            },
                            color: "#362D2D"
                        }
                    }}
                }
            />
        </>
    )
}

export default ProductSalesChart
