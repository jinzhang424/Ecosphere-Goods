import axios from "axios"

export const fetchTrackingInfo = async (trackingNumber) => {
    try {
        const res = axios.get(`/package-tracking/package-info/${trackingNumber}`) 

        return res
    } catch (err) {
        throw new Error(err.message)
    }
}