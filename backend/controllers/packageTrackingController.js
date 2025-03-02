const axios = require("axios")

const fetchTrackingInfo = async (req, res) => {
    console.log("*** Fetching tracking info ***")
    const { id } = req.params

    try {
        const trackingRes = await axios.get(`https://api.aftership.com/tracking/2025-01/trackings`, {
            headers: {
                "as-api-key": process.env.AFTERSHIP_API_KEY
            }
        }) 

        return res.status(201).json({ trackingRes })
    } catch (err) {
        console.error(err.message)
        return res.status(500).json({ message: err.message })
    }
}

module.exports = { fetchTrackingInfo }