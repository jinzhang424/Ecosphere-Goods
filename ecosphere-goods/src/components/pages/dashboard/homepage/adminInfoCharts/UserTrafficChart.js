import React from 'react'
import { fetchUserTraffic } from '../../../../../api/storeDataHandling'
import Chart from '../../../../utility/charts/Chart';

const UserTrafficChart = () => {

    return (
        <>
            <Chart 
                title="Product revenue of current month" 
                type="bar" 
                maintainAspectRatio={false}
                fetchData={fetchUserTraffic}
            />
        </>
    )
}

export default UserTrafficChart
