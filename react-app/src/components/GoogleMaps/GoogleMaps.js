import React, { useCallback, useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api"

const MapPageA = () => {

    // This sets the center of the map
    const [currentPosition, setCurrentPosition] = useState({lat:43.11016617798622,lng:-89.48826131670266})

    // This is the equivalent to a script tag
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API
    })

    const containerStyle = {
        width: '800px',
        height: '800px'
    };

    const [map, setMap] = useState(null)

    const onUnmount = useCallback(function callback(map){
        setMap(null)
    }, [])

    return (
        <div className="map_page__container">
            <div style={{height: '900px', width: '900px'}}>
                {isLoaded && <GoogleMap
                mapContainerStyle={containerStyle}
                zoom={8}
                center={currentPosition}
                onUnmount={onUnmount}
                >
                </GoogleMap>}
            </div>
        </div>
    )
}

export default MapPageA
