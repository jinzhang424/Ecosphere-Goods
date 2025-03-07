import axios from "axios"

export const fetchTrackingInfo = async (trackingNumber) => {
    try {
        const res = await axios.get(`/package-tracking/package-info/${trackingNumber}`) 

        return res.data.data;
    } catch (err) {
        throw new Error(err.message)
    }
}