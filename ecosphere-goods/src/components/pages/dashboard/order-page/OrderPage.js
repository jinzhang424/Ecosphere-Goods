import React, { useEffect, useState } from 'react'
import { fetchOrderByID } from '../../../../api/orderHandling'
import { auth } from '../../../../firebase';
import { useParams } from 'react-router-dom';
import { fetchTrackingInfo } from '../../../../api/trackingHandling';
import convertToDateString from '../../../../utility-functions/covertToDateString';
import unitToDollarString from '../../../../utility-functions/unitToDollarString';
import BasicInfoDisplay from '../../../utility/BasicInfoDisplay';
import TrackCheckpoints from './TrackCheckpoints';

const adjustCheckpointDates = (trackInfo) => {
    return trackInfo.map((trackData) => {
        const dateAndTime = trackData?.checkpoint_date?.split("T");
        const adjustedDate = dateAndTime[0]?.replaceAll("-", "/")
        
        return {
            ...trackData,
            'checkpoint_date': [
                adjustedDate,
                dateAndTime[1]
            ]
        };
    })
}

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
                
                const adjustedOriginTrackInfo = adjustCheckpointDates(data?.originTrackInfo)
                const adjustedDestinationTrackInfo = adjustCheckpointDates(data?.destinationTrackInfo)

                data.originTrackInfo = adjustedOriginTrackInfo;
                data.destinationTrackInfo = adjustedDestinationTrackInfo

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
            
            <div className='flex gap-16 mt-8'>
                {/** Transit data display */}
                <div className='flex flex-col overflow-y-scroll h-full max-h-[500px] max-w-[50%] [&::-webkit-scrollbar]:hidden w-full'>
                    <TrackCheckpoints trackData={trackingData?.originTrackInfo} trailingDots={true}/>
                    <TrackCheckpoints trackData={trackingData?.destinationTrackInfo}/>
                </div>

                <div className='flex flex-col max-w-[50%] w-full gap-8'>
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
                        <h1 className='font-header text-subtitle'>Products Ordered</h1>
                        <div className='mt-4 overflow-y-scroll [&::-webkit-scrollbar]:hidden'>
                            {orderData.orderData && orderData.orderData.products.map((product) => (
                                <ProductDisplay
                                    img={product.images[0]}
                                    name={product.name}
                                    unitAmount={product.priceData.unit_amount}
                                    quantity={product.quantity}
                                    key={product.id}
                                />
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

const ProductDisplay = ({ img, name, unitAmount, quantity }) => {
    return (
        <div className='grid grid-cols-[minmax(48px,_64px)_1fr_1fr_1fr] items-center text-center rounded-lg bg-light-brown bg-opacity-20 overflow-hidden'>
            <img 
                className='max-w-16 max-h-16 aspect-square object-cover'
                src={img} 
                alt="" 
            />
            <p>{name}</p>
            <p>{unitToDollarString(unitAmount)}</p>
            <p>{[quantity]}</p>
        </div>
    )
}

export default OrderPage
