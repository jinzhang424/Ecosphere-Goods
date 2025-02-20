import React from 'react'
import Chart from '../../../../utility/charts/Chart';
import { fetchCategoricalSalesData } from '../../../../../api/storeDataHandling';

const CategoricalSalesChart = () => {

    return (
        <>
            <Chart 
                title="Categorical Sales data of path 12 months" 
                type="line"
                fetchData={fetchCategoricalSalesData}
            />
        </>
    )
}

export default CategoricalSalesChart
