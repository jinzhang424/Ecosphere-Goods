require('dotenv').config();
const axios = require("axios")

const fetchPackageLocation = async (trackingNumber) => {
    axios.get(`https://api.trackingmore.com/v4/trackings/get?tracking_numbers=TEST1234123421`, {
        headers: {
            "Tracking-Api-Key": process.env.TRACKINGMORE_API_KEY
        }
    })
}

// !!! IMPORTANT !!! Tracking number needs to be updated. Currently we are only creating test packages.
const postTracking = async (orderID, destinationCountry, destinationCity, customerEmail, customer_sms, postcode) => {
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
            "destination_country": destinationCountry,
            "destination_city": destinationCity,
            "tracking_postal_code": postcode,
            "tracking_origin_country": "New Zealand",
            "tracking_destination_country": destinationCountry
        },
        {
            headers: {
                "Tracking-Api-Key": process.env.TRACKINGMORE_API_KEY
            }
        }
    )
}

module.exports = { fetchPackageLocation, postTracking }