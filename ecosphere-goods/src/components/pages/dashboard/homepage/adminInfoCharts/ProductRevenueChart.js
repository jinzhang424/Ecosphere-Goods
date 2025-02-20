import React from 'react'
import { fetchProductRevenueData } from '../../../../../api/storeDataHandling'
import Chart from '../../../../utility/charts/Chart'

const ProductRevenueChart = () => {
    
    return (
        <Chart 
            title="Product revenue of current month" 
            type="pie" 
            fetchData={fetchProductRevenueData}
        />
    )
}

export default ProductRevenueChart
