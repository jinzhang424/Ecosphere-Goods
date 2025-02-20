import React from 'react'
import { fetchUserTraffic } from '../../../../../api/storeDataHandling'
import Chart from '../../../../utility/charts/Chart';

const UserTrafficChart = () => {

    return (
        <>
            <Chart 
                title="User traffic of past 12 months" 
                type="bar" 
                maintainAspectRatio={false}
                fetchData={fetchUserTraffic}
            />
        </>
    )
}

export default UserTrafficChart
