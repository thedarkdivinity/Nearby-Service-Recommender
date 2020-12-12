import React from 'react';
import Mar from "../../src/marker.jpg";
import ReactMapGL, {Marker,Popup} from "react-map-gl";
const MyPlace = ({lati,longi}) => {
    return (
      <>
     
        <Marker latitude={lati} longitude={longi}>
       
        <img src={Mar} alt="marker"  width="10" height="10" />
        
      </Marker>
      </>
    )
}

export default MyPlace
