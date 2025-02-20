import React, { useEffect, useState } from 'react'
import { fetchProductRevenueData } from '../../../../../api/storeDataHandling'
import Chart from '../../../../utility/charts/Chart';
import { auth } from '../../../../../firebase';

const ProductRevenueChart = () => {
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

            } catch (error) {
                console.error(error.message)
            }
        }

        getProductSales()
    }, [])
    
    return (
        <Chart data={chartData} title="Product revenue of current month" type="pie" />
    )
}

export default ProductRevenueChart
