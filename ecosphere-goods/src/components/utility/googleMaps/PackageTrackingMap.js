import React from 'react'
import { APIProvider, Map } from "@vis.gl/react-google-maps"
import Directions from './Directions'

const PackageTrackingMap = () => {
    const startPos = {lat: 53.54992, lng: 10.00678};

    return (
        <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
            <div className='w-full h-full'>
                <Map 
                    defaultCenter={startPos} 
                    defaultZoom={10} 
                    mapId="package_tracking_map" 
                    fullscreenControl={false}
                >
                    <Directions/>
                </Map>
            </div>
        </APIProvider>
    )
}

export default PackageTrackingMap
