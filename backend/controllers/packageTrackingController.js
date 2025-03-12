const { fetchPackageLocation, postTracking } = require('../api/TrackingMoreApi')
const { db } = require("../config/firebase")

const createTracking = async (orderID, uid) => {
    console.log("*** Creating tracking ***");

    if (!orderID || !uid) {
        throw new Error(`Missing order id or uid. Order id: ${orderID}, uid: ${uid}`);
    }

    try {
        const customerSnap = await db.collection("customers").doc(uid).get();
        const customerData = customerSnap.data();

        const deliveryInfo = customerData.deliveryInfo;

        await postTracking(
            orderID, 
            deliveryInfo.country, 
            deliveryInfo.city, 
            customerData.email, 
            deliveryInfo.phoneNumber, 
            deliveryInfo.postalCode
        );
        
        return;
    } catch (error) {
        throw new Error(error.message);
    }
}

const getPackageLocation = async (req, res) => {
    console.log("*** Getting package location ***")
    const { trackingNumber } = req.params

    try {
        // const trackingRes = await fetchPackageLocation(trackingNumber);

        const mockData = {
            originTrackInfo: [
                {
                    location: "New York - US",
                    checkpoint_delivery_status: "Order Recieved",
                    checkpoint_date: "2025-01-3T12:00",
                    tracking_detail: "Package order received"
                },
                {
                    location: "New York - US",
                    checkpoint_delivery_status: "Order Recieved",
                    checkpoint_date: "2025-01-3T12:00",
                    tracking_detail: "Package order received"
                },
                {
                    location: "New York - US",
                    checkpoint_delivery_status: "In Transit",
                    checkpoint_date: "2025-01-4T16:34",
                    tracking_detail: "Package order received"
                },
                {
                    location: "New York - US",
                    checkpoint_delivery_status: "In Transit",
                    checkpoint_date: "2025-01-5T13:23",
                    tracking_detail: "Package order received"
                },
                {
                    location: "New York - US",
                    checkpoint_delivery_status: "Shipping",
                    checkpoint_date: "2025-01-5T08:23",
                    tracking_detail: "Package order received"
                }
            ],
            destinationTrackInfo: [
                {
                    location: "Auckland - NZ",
                    checkpoint_delivery_status: "In Customs",
                    checkpoint_date: "2025-01-10T04:45",
                    tracking_detail: "Package order received"
                },
                {
                    location: "Auckland - NZ",
                    checkpoint_delivery_status: "Processing",
                    checkpoint_date: "2025-01-11T14:17",
                    tracking_detail: "Package order received"
                },
                {
                    location: "Auckland - NZ",
                    checkpoint_delivery_status: "On the Way",
                    checkpoint_date: "2025-01-12T13:23",
                    tracking_detail: "Package order received"
                },
                {
                    location: "Auckland - NZ",
                    checkpoint_delivery_status: "Delivered",
                    checkpoint_date: "2025-01-12T17:01",
                    tracking_detail: "Package order received"
                }
            ]
            
        }

        return res.status(201).json({ data: mockData })
    } catch (err) {
        console.error(err.message)
        return res.status(500).json({ message: err.message })
    }
}

module.exports = { getPackageLocation, createTracking }