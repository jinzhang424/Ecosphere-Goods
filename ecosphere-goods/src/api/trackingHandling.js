import axios from "axios"

export const fetchTrackingInfo = async (trackingNumber) => {
    try {
        const res = axios.get(`/package-tracking/package-info/TEST1234123421`) 

        return res
    } catch (err) {
        throw new Error(err.message)
    }
}