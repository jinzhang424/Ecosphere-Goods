import React, { useEffect, useState } from 'react'
import { fetchProductRevenueData } from '../../../../../api/storeDataHandling'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS } from "chart.js/auto";
import { auth } from '../../../../../firebase';

const ProductRevenueChart = () => {
    const [loading, setLoading] = useState(true)
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{ label: "", data: [] }],
    })

    useEffect(() => {
        const getProductSales = async () => {
            try {
                const idToken = await auth.currentUser.getIdToken()
                const data = await fetchProductRevenueData(idToken)
                
                const dateLabels = data.productNames
                const productRevenueData = data.productRevenue

                setChartData({
                    labels: dateLabels,
                    datasets: [{
                        label: "Revenue ($)",
                        data: productRevenueData,
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
                            text: 'Product revenue of current month',
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

export default ProductRevenueChart
