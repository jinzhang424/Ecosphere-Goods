import React, { useEffect, useState } from 'react'
import { fetchOrderByID } from '../../../../api/orderHandling'
import { auth } from '../../../../firebase';
import { useParams } from 'react-router-dom';
import { fetchTrackingInfo } from '../../../../api/trackingHandling';

const OrderPage = () => {
    const [orderData, setOrderData] = useState({})
    const {uid, orderID} = useParams();

    useEffect(() => {
        const getOrderData = async () => {

            try {
                const idToken = await auth.currentUser.getIdToken();
                const orderData = await fetchOrderByID(uid, orderID, idToken);

                setOrderData(orderData)
            } catch (error) {
                console.error(error.message)
            }
        }

        getOrderData();
    }, [orderID, uid])

    console.log(orderData)

    return (
        <div className='w-full h-full bg-off-white rounded-3xl'>
            
        </div>
    )
}

export default OrderPage
