import React from 'react'
import { fetchMonthlyRevenueData } from '../../../../../api/storeDataHandling'
import Chart from '../../../../utility/charts/Chart';

const MonthlyRevenueChart = () => {
    return (
        <>
            <Chart 
                title="Revenue of the past 30 Days" 
                type="line" 
                fetchData={fetchMonthlyRevenueData}
            />
        </>
    )
}

export default MonthlyRevenueChart
