import React, { useEffect, useState } from 'react'
import { fetchProductSalesData } from '../../../../../api/storeDataHandling'
import Chart from '../../../../utility/charts/Chart';
import { auth } from '../../../../../firebase';

const ProductSalesChart = () => {
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
                        label: "Sales ($)",
                        data: productSalesData,
                    }],
                })

            } catch (error) {
                console.error(error.message)
            }
        }

        getProductSales()
    }, [])

    console.log("PRODUCT SALES CHART DATA", chartData)

    return (
        <Chart data={chartData} title="Product Sales of current month" type="pie" />
    )
}

export default ProductSalesChart
