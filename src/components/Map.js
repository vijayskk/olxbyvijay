import React from 'react'
import {GoogleMap , withScriptjs , withGoogleMap} from 'react-google-maps'
function Map() {
    return (
        <GoogleMap defaultZoom={10} defaultCenter={{lat:12,lng:12 }} />

        
    )
}

export const WrappedMap = withScriptjs(withGoogleMap(Map))
