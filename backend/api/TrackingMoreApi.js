require('dotenv').config();
import axios from "axios"


export const fetchPackageLocation = async (trackingNumber) => {
    axios.get(`https://api.trackingmore.com/v4/trackings/get?tracking_numbers=${trackingNumber}`, {
        headers: {
            "Tracking-Api-Key": process.env.TRACKINGMORE_API_KEY
        }
    })
}

module.exports = { fetchPackageLocation }