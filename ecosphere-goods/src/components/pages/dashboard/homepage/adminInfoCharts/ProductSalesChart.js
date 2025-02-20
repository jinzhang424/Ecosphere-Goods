import React from 'react'
import { fetchProductSalesData } from '../../../../../api/storeDataHandling'
import Chart from '../../../../utility/charts/Chart';

const ProductSalesChart = () => {

    return (
        <Chart 
            title="Product Sales of current month" 
            type="pie" 
            fetchData={fetchProductSalesData}
        />
    )
}

export default ProductSalesChart
