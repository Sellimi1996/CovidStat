import React from 'react'
import { Map, GoogleApiWrapper } from 'google-maps-react'

function Jps(props) {
    const style = {
        width: '900px',
        height: '450px',
        display: 'flex',
        
        }
    return (
        <div className="map">
            <Map google={props.google} style={style} />
        </div>
    )
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyBeOuw4w3sVElx3NpbReJ_M-HDmh1gRxwc'),
    version: 3.31
   })(Jps);