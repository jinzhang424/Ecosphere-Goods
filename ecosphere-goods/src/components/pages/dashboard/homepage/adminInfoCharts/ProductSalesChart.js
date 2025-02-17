import React, { useEffect, useState } from 'react'
import { fetchMonthlyRevenueData, fetchProductSalesData } from '../../../../../api/storeDataHandling'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS } from "chart.js/auto";
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
        <div className='flex flex-col gap-3'>
            <h1 className='text-dark-brown font-header text-lg'>Product Sales of current month</h1>
            <div className='flex w-full justify-center items-center'>
                {!loading && <Pie data={chartData}/>}
            </div>
        </div>
    )
}

export default ProductSalesChart
