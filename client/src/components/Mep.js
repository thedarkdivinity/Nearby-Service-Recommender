import React, { useState, useEffect } from "react";


import ReactMapGL, { MapState, Marker ,Popup} from "react-map-gl";
import { MapContext } from "react-mapbox-gl";
import Mar from "../../src/marker.jpg"
import {useAuth0} from '@auth0/auth0-react';
import Axios from "axios";
const Mep=()=> {
  const [viewport, setViewport] = useState({
    latitude: 19.0903,
    longitude: 72.8714,
    zoom: 10,
    width: "100vw",
    height: "100vh",
  });
  const { isAuthenticated} = useAuth0();
  const [lati, setLati] = useState(19.021324);
  const [longi, setLongi] = useState(72.84241780000002);
  const [places,setPlaces]=useState([]);
  const [query,setQuery]=useState("");
  const [selectedPlace,setSelectedPlace]=useState(null);
  const [parameterToSearch,setParameterToSearch]=useState("petrol stations")
  const ApiKey =
    "pk.eyJ1Ijoid2ltc2dkIiwiYSI6ImNrZzg4bGtvYTBiNmUycWxzYmlmdW95ZDQifQ.RT-TaJBBkcFVrVqwuusKpQ";
  const HereKey = "SsQDGgfyRDH31cHPtVCPz2w9WimPDEbQjHyAR_Xb-NY";
  useEffect(() => {
    getLocation();
  }, [lati]);
  useEffect(()=>{
    getLocs();
  },[parameterToSearch])
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      // console.log("Location data not available");
    }
  }
  const getLocs = async () => {
    
    // let resul= await Axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longi},${lati}.json?types=poi&access_token=${ApiKey}`)
    // console.log(resul.data.features[0].text);
    try {
      let nearbyPlaces = await Axios.get(`https://discover.search.hereapi.com/v1/discover?at=${lati},${longi}&q=${parameterToSearch}&lang=en-US&apiKey=SsQDGgfyRDH31cHPtVCPz2w9WimPDEbQjHyAR_Xb-NY`);
    var resultsNear=nearbyPlaces.data.items;
    setPlaces(resultsNear);
    

    } catch (error) {
      // console.log("Can't access data");
       //  console.log(` Latitude ${place.position.lat} Longitude ${place.position.lng}`)
    }
    
  };
  


  const showPosition = (position) => {
    console.log()
    setLati(lati);
    setLongi(longi);
    console.log(lati + " ");
    console.log(longi);

    getLocs();
  };
  return (
    <>
    {isAuthenticated && (
      <div className="App">
    <input type="text" value={query} onChange={(e)=>setQuery(e.target.value)} />
    <button 
    onClick={()=>setParameterToSearch(query)}
    >Search Now</button>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1Ijoid2ltc2dkIiwiYSI6ImNrZzg4bGtvYTBiNmUycWxzYmlmdW95ZDQifQ.RT-TaJBBkcFVrVqwuusKpQ"
        onViewportChange={(viewport) => setViewport(viewport)}
        mapStyle="mapbox://styles/wimsgd/ckgaja7go1om919olowxdob9u"
      >
        <Marker latitude={lati} longitude={longi}>
       
          <img src={Mar} alt="marker" width="10" height="10" />
        
        </Marker>
       {places.map((place)=>{
        
       
        return(
          <Marker latitude={place.position.lat} key={place.position.lat*Math.random()*100000} longitude={place.position.lng}>
          <button className="MarkerBtn" onClick={(e)=>{
            e.preventDefault();
            setSelectedPlace(place);
          }}>
          <img src={Mar} alt="marker" width="10" height="10" />
          </button>
        </Marker>
        )
       })}
       {selectedPlace ? (
        <Popup latitude={selectedPlace.position.lat} longitude={selectedPlace.position.lng}
        onClose={()=>setSelectedPlace(null)}
        >
        <div>
        <h3>{selectedPlace.title}</h3>
        </div>
        </Popup>
       ): null}
      </ReactMapGL>
    </div>

    )}
    
    </>
  );
}

export default Mep;
