import React, { useState, useEffect } from "react";
import Modal from "react-modal";

import ReactMapGL, { MapState, Marker ,Popup} from "react-map-gl";
import { MapContext } from "react-mapbox-gl";
import Mar from "../../src/marker.jpg"
import {useAuth0} from '@auth0/auth0-react';
import axios from "axios";
import { Button, TextField } from "@material-ui/core";
const Mep=()=> {
  const [viewport, setViewport] = useState({
    latitude: 19.0903,
    longitude: 72.8714,
    zoom: 10,
    width: "100vw",
    height: "100vh",
  });
  const { isAuthenticated ,user } = useAuth0();
  const [rating,setRating]=useState(1);
  const [opened,setOpened]=useState(false);
  const [lati, setLati] = useState(19.021324);
  const [longi, setLongi] = useState(72.84241780000002);
  const [places,setPlaces]=useState([]);
  const [query,setQuery]=useState("");
  const [selectedPlace,setSelectedPlace]=useState(null);
  const [parameterToSearch,setParameterToSearch]=useState("petrol stations");
  const [alertShown,setAlertShown]=useState(true);
  const [getRatings,setGetRatings]=useState([]);
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
  useEffect(()=>{
    const listener = e=>{
      if (e.key === "Escape"){
        setSelectedPlace(null);
        setOpened(false);
      }
    };
    window.addEventListener("keydown",listener);
  })
  const getLocs = async () => {
    
    // let resul= await Axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longi},${lati}.json?types=poi&access_token=${ApiKey}`)
    // console.log(resul.data.features[0].text);
    try {
      let nearbyPlaces = await axios.get(`https://discover.search.hereapi.com/v1/discover?at=${lati},${longi}&q=${parameterToSearch}&lang=en-US&apiKey=SsQDGgfyRDH31cHPtVCPz2w9WimPDEbQjHyAR_Xb-NY`);
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



  //HANDLE RATINGS FORM
  const ratingHandler=(e)=>{
    e.preventDefault();
    alert("submitted")
    const email=user.email;
    const uname=user.name;
    const pname=selectedPlace.title;
    const pid=selectedPlace.position.lat * selectedPlace.position.lng;
    console.log(email);
    const ratingObject={
      pid,
      rating,
      email,
      pname,
      uname
    };
    axios.post("http://localhost:5000/rate",ratingObject);
  }
  if(!isAuthenticated && alertShown){
    alert("You need to log in");

    setAlertShown(false);
  }
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
          <Marker latitude={place.position.lat} key={place.position.lat*place.position.lng} longitude={place.position.lng}>
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
        



        >
        <div>
        <h3>{selectedPlace.title}</h3>
        <form onSubmit={ratingHandler}>
        <TextField 
        type="number" 
        variant="standard" 
        value={rating}
        onChange={(e)=>{
          setRating(e.target.value);

        }}
        color="primary" 
        placeholder="rating" />
        <div style={{marginTop:"20px"}}>
        <Button
        variant="contained"
        type="submit"
        
        color="primary" 
        style={{
          
          marginRight:"auto"
        }}
        >Rate</Button>
       
        <Button
        variant="contained"
        color="primary" 
        onClick={async()=>{
          
          setOpened(true);
         try {
           const viewRatings=await axios.get(`http://localhost:5000/rate/${selectedPlace.position.lat * selectedPlace.position.lng}`);
           setGetRatings(viewRatings.data);
         } catch (error) {
           console.log(error.message);
         }
          
        }}
        style={{
          
          marginLeft:"auto"
        }}
        >View Rating</Button>
        <Modal isOpen={opened} >
        <h2>View Ratings</h2>
        <Button variant="contained" color="secondary" onClick={()=>setOpened(false)}>Close</Button>
       <ul>
       {getRatings.map((rati)=>{
        return(
          <li key={rati.pid}>{rati.email} {rati.pname} {rati.rating}</li>
        );
       })}
       </ul>
        
        </Modal>
        </div>
        </form>
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
