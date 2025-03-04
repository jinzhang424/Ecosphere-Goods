const { fetchPackageLocation, postTracking } = require('../api/TrackingMoreApi')

const createTracking = async (orderID) => {
    console.log("*** Creating tracking ***");

    try {
        await postTracking(orderID, "new-zealand-post");
        
        return;
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: error.message });
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