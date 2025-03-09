import React, { useEffect, useState } from 'react'
import { fetchOrderByID } from '../../../../api/orderHandling'
import { auth } from '../../../../firebase';
import { useParams } from 'react-router-dom';
import { fetchTrackingInfo } from '../../../../api/trackingHandling';
import { FaCircle } from "react-icons/fa";

const OrderPage = () => {
    const [orderData, setOrderData] = useState({});
    const [trackingData, setTrackingData] = useState({})
    const {uid, orderID} = useParams();

    const temp = [1, 2, 3, 4, 5, 6, 7];
    const dots = new Array(5).fill(0);

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

    console.log(trackingData)

    return (
        <div className='w-full h-full bg-off-white rounded-3xl relative p-8'>
            <h1 className='text-header font-header'>Order Tracking</h1>
            
            {/** Transit data display */}
            <div className='flex flex-col overflow-y-scroll h-full max-h-[500px] max-w-[50%] [&::-webkit-scrollbar]:hidden'>
                {trackingData.originTrackInfo.length > 0 && trackingData.originTrackInfo.map((trackInfo, index) => (
                    <>
                        <div className='grid grid-cols-[80px_50px_auto] grid-rows-[auto_auto] items-center text-dark-brown' key={index}>
                            {/** Checkpoint Date and time */}
                            <div className='ml-auto'>
                                <p className='font-header text-right'>{trackInfo.checkpoint_date[0]}</p>
                                <p className='text-right'>{trackInfo.checkpoint_date[1]}</p>
                            </div>

                            {/** Icon */}
                            <div className="flex justify-center items-center">
                                <FaCircle />
                            </div>

                            {/** Checkpoint Info */}
                            <div className='bg-light-brown p-4 rounded-xl bg-opacity-30'>
                                <p className='text-left font-header'>{trackInfo.location} | {trackInfo.checkpoint_delivery_status}</p>
                                <p>{trackInfo.tracking_detail}</p>
                            </div>

                            {/** Dots */}
                            {index !== temp.length - 1 && (
                                <div className="flex flex-col justify-center items-center row-start-2 col-start-2 h-fit gap-4 opacity-40">
                                    {dots.map((_, index) => (
                                        <FaCircle key={index} size={8}/>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                ))}

                {trackingData.destinationTrackInfo.length > 0 && trackingData.destinationTrackInfo.map((trackInfo, index) => (
                    <>
                        <div className='grid grid-cols-[80px_50px_auto] grid-rows-[auto_auto] items-center text-dark-brown' key={index}>
                            {/** Checkpoint Date and time */}
                            <div className='ml-auto'>
                                <p className='font-header text-right'>{trackInfo.checkpoint_date[0]}</p>
                                <p className='text-right'>{trackInfo.checkpoint_date[1]}</p>
                            </div>

                            {/** Icon */}
                            <div className="flex justify-center items-center">
                                <FaCircle />
                            </div>

                            {/** Checkpoint Info */}
                            <div className='bg-light-brown p-4 rounded-xl bg-opacity-30'>
                                <p className='text-left font-header'>{trackInfo.location} | {trackInfo.checkpoint_delivery_status}</p>
                                <p>{trackInfo.tracking_detail}</p>
                            </div>

                            {/** Dots */}
                            {index !== temp.length - 1 && (
                                <div className="flex flex-col justify-center items-center row-start-2 col-start-2 h-fit gap-4 opacity-40">
                                    {dots.map((_, index) => (
                                        <FaCircle key={index} size={8}/>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                ))}
            </div>
        </div>
    )
}

export default OrderPage
