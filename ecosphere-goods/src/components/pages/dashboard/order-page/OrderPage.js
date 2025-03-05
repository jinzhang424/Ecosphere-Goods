import React, { useEffect, useState } from 'react'
import { fetchOrderByID } from '../../../../api/orderHandling'
import { auth } from '../../../../firebase';
import { useParams } from 'react-router-dom';
import { fetchTrackingInfo } from '../../../../api/trackingHandling';
import GoogleMaps from '../../../utility/googleMaps/GoogleMaps';
import Directions from '../../../utility/googleMaps/Directions';

const OrderPage = () => {
    const [orderData, setOrderData] = useState({});
    const [trackingData, setTrackingData] = useState({})
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

    useEffect(() => {
        const getTrackingData = async () => {
            try {
                const res = await fetchTrackingInfo('TEST1234123421')
                console.log(res)
            } catch (err) {
                console.error(err.message)
            }
        }

        getTrackingData();
    }, [])

    console.log(orderData)

    return (
        <div className='w-full h-full bg-off-white rounded-3xl'>
            <GoogleMaps>
                <Directions/>
            </GoogleMaps>
        </div>
    )
}

export default OrderPage
