import React from 'react'
import { fetchOrderByID } from '../../../utilityFunctions/orderHandling'
import { useLoaderData } from 'react-router-dom'

export const orderLoader = async ({ params }) => {
    const { userID, orderID } = params

    let order
    try {
        order = await fetchOrderByID(orderID, userID)
    } catch (error) {
        console.log(error.message)
    }

    return order
}

const LowLevelOrderView = () => {
    const order = useLoaderData()

    return (
        <div className='w-full h-full bg-off-white rounded-3xl p-8'>
            hi
        </div>
    )
}

export default LowLevelOrderView
