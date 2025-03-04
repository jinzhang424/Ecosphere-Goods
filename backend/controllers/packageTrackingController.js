const axios = require("axios")
const { fetchPackageLocation } = require('../api/TrackingMoreApi')

const getPackageLocation = async (req, res) => {
    console.log("*** Fetching tracking info ***")
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

module.exports = { getPackageLocation }