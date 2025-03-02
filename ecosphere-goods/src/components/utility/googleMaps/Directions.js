"use client"
import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps'
import React, { useEffect, useState } from 'react'

const Directions = () => {
    const google = window.google;
    const map = useMap();
    const routesLibrary = useMapsLibrary('routes');
    const [directionsService, setDirectionsService] = useState();
    const [directionsRenderer, setDirectionsRenderer] = useState();
    
    useEffect(() => {
        if (!routesLibrary || !map) return;

        setDirectionsService(new routesLibrary.DirectionsService());
        setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }))

    }, [routesLibrary, map])

    useEffect(() => {
        if (!directionsRenderer || !directionsRenderer) return;

        directionsService.route({
            origin: "100 Front St, Toronto ON",
            destination: "500 College St, Toronto ON",
            travelMode: google.maps.TravelMode.DRIVING
        }).then((res) => {
            directionsRenderer.setDirections(res)
        })

    }, [directionsService, directionsRenderer, google.maps.TravelMode.DRIVING])

    return (
        <div>
        
        </div>
    )
}

export default Directions
