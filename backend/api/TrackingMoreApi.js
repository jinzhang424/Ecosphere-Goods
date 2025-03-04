require('dotenv').config();
const axios = require("axios")


const fetchPackageLocation = async (trackingNumber) => {
    axios.get(`https://api.trackingmore.com/v4/trackings/get?tracking_numbers=${trackingNumber}`, {
        headers: {
            "Tracking-Api-Key": process.env.TRACKINGMORE_API_KEY
        }
    })
}

const postTracking = async (orderID, courierCode) => {
    axios.post("https://api.trackingmore.com/v4/trackings/create", 
        {
            "tracking_number": orderID,
            "courier_code": courierCode
        },
        {
            headers: {
                "Tracking-Api-Key": process.env.TRACKINGMORE_API_KEY
            }
        }
    )
}

module.exports = { fetchPackageLocation, postTracking }