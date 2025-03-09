import React, { useEffect, useState } from 'react'
import { fetchOrderByID } from '../../../../api/orderHandling'
import { auth } from '../../../../firebase';
import { useParams } from 'react-router-dom';
import { fetchTrackingInfo } from '../../../../api/trackingHandling';
import convertToDateString from '../../../../utility-functions/covertToDateString';
import unitToDollarString from '../../../../utility-functions/unitToDollarString';
import BasicInfoDisplay from '../../../utility/BasicInfoDisplay';
import TrackCheckpoints from './TrackCheckpoints';

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
                const data = await fetchTrackingInfo('TEST1234123442');
                
                const adjustedOriginTrackInfo = data.originTrackInfo.map((trackInfo) => {
                    const dateAndTime = trackInfo.checkpoint_date?.split("T");
                    const adjustedDate = dateAndTime[0].replaceAll("-", "/")
                    
                    return {
                        ...trackInfo,
                        'checkpoint_date': [
                            adjustedDate,
                            dateAndTime[1]
                        ]
                    };
                })

                data.originTrackInfo = adjustedOriginTrackInfo;

                setTrackingData(data);
            } catch (err) {
                console.error(err.message)
            }
        }

        getTrackingData();
    }, [])

    console.log(orderData)

    return (
        <div className='w-full h-full bg-off-white rounded-3xl relative p-8'>
            <h1 className='text-header font-header'>Order Tracking</h1>
            
            <div className='flex gap-8 mt-8'>
                {/** Transit data display */}
                <div className='flex flex-col overflow-y-scroll h-full max-h-[500px] max-w-[50%] [&::-webkit-scrollbar]:hidden w-full'>
                    <TrackCheckpoints trackData={trackingData.originTrackInfo}/>
                    <TrackCheckpoints trackData={trackingData.destinationTrackInfo}/>
                </div>

                <div className='flex flex-col max-w-[50%] w-full'>
                    {/** Basic Order Info */}
                    <section className='flex flex-col border-3 border-dark-brown rounded-xl border-opacity-30 p-8 gap-4'>
                        <h1 className='font-header text-subtitle'>Order Details</h1>
                        
                        <div className='flex flex-col gap-2'>
                            <BasicInfoDisplay 
                                infoLabel="Email" 
                                infoData={orderData?.customer_email}
                            />

                            <BasicInfoDisplay 
                                infoLabel="Date Ordered" 
                                infoData={convertToDateString(
                                    orderData?.orderData?.created?._nanoseconds, 
                                    orderData?.orderData?.created?._seconds
                                )}
                            />

                            <BasicInfoDisplay 
                                infoLabel="Total Cost" 
                                infoData={unitToDollarString(orderData?.orderData?.total_price)}
                            />
                        </div>
                    </section>

                    {/** All products display */}
                    <section>
                        
                    </section>
                </div>
            </div>
        </div>
    )
}

export default OrderPage
