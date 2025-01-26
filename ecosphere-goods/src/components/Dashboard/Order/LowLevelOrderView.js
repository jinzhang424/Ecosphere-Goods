import React from 'react'
import { fetchOrderByID } from '../../../utilityFunctions/orderHandling'

export const orderLoader = async ({ params }) => {
    const { userID, orderID } = params
    
    let order
    try {
      order = fetchOrderByID(orderID, userID) 
    } catch(error) {
      console.log(error)
    }
    
    return order
}

const LowLevelOrderView = () => {
  return (
    <div>
      
    </div>
  )
}

export default LowLevelOrderView
