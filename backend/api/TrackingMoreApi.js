require('dotenv').config();
const axios = require("axios")

const fetchPackageLocation = async (req, res) => {
    const { trackingNumber } = req.params;

    try {
        const trackingRes = axios.get(`https://api.trackingmore.com/v4/trackings/get?tracking_numbers=${trackingNumber}`, {
            headers: {
                "Tracking-Api-Key": process.env.TRACKINGMORE_API_KEY
            }
        })

        const destinationTrackInfo = trackingRes.data.destination_info.trackinfo;
        const originTrackInfo = trackingRes.data.origin_info.trackinfo;

        if (destinationTrackInfo) {
            return res.status(201).json({ success:true, destinationTrackInfo });
        } else {
            return res.status(201).json({ success:true, originTrackInfo });
        }

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, message: error.message})
    }
}

// !!! IMPORTANT !!! Tracking number needs to be updated to match the orderID
const postTracking = async (orderID, destinationCountry, destinationCity, customerEmail, customer_sms, postcode) => {
    try {
        axios.post("https://api.trackingmore.com/v4/trackings/create", 
            {
                "tracking_number": "TEST1234123421",
                "courier_code": "new-zealand-post",
                "origin_country_iso2": "NZ",
                "destination_country_iso2": destinationCountry,
                "customer_email": customerEmail,
                "customer_sms": customer_sms,
                "recipient_postcode": postcode,
                "order_id": orderID,
                "tracking_postal_code": postcode,
                "tracking_origin_country": "NZ",
                "tracking_destination_country": destinationCountry
            },
            {
                headers: {
                    "Tracking-Api-Key": process.env.TRACKINGMORE_API_KEY
                }
            }
        )
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { fetchPackageLocation, postTracking }