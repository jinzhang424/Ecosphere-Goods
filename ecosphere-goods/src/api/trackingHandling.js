import axios from "axios"

export const fetchTrackingInfo = async (id) => {
    try {
        const res = axios.get(`https://api.aftership.com/tracking/2025-01/trackings/${id}`, {
            headers: {
                "as-api-key": process.env.REACT_APP_AFTERSHIP_API_KEY
            }
        }) 

        return res
    } catch (err) {
        throw new Error(err.message)
    }
}