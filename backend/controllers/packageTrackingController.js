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
        console.error(error.message);
        throw new Error(error.message);
    }
}

const getPackageLocation = async (req, res) => {
    console.log("*** Getting package location ***")
    const { trackingNumber } = req.params

    try {
        const trackingRes = await fetchPackageLocation(trackingNumber);
        const trackInfo = trackingRes.data.trackinfo
        const location = trackInfo[trackInfo.length].location
        return res.status(201).json({ location })
    } catch (err) {
        console.error(err.message)
        return res.status(500).json({ message: err.message })
    }
}

module.exports = { getPackageLocation, createTracking }