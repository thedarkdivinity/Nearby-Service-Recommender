import React, { useState, useEffect } from "react";


import { makeStyles } from '@material-ui/core/styles';
import ReactMapGL, { MapState, Marker ,Popup} from "react-map-gl";
import { MapContext } from "react-mapbox-gl";
import Mar from "../../src/marker.jpg"
import {useAuth0} from '@auth0/auth0-react';
import axios from "axios";
import { useHistory } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import { Button, TextField} from "@material-ui/core";
import MyPlace from "./MyPlace";
import SelectedButtons from "./SelectedButtons";
import MapModal from "./MapModal";
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});
const Mep=()=> {
  const history = useHistory();
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
  const [lati, setLati] = useState(0);
  const [longi, setLongi] = useState(0);
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
  }, [lati,longi]);
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
    
   
    try {
      let nearbyPlaces = await axios.get(`https://discover.search.hereapi.com/v1/discover?at=${lati},${longi}&q=${parameterToSearch}&lang=en-US&apiKey=SsQDGgfyRDH31cHPtVCPz2w9WimPDEbQjHyAR_Xb-NY`);
    var resultsNear=nearbyPlaces.data.items;
    setPlaces(resultsNear);
    

    } catch (error) {
     console.log(error.message); 
    }
    
  };
  


  const showPosition = (position) => {
    console.log()
    setLati(position.coords.latitude);
    setLongi(position.coords.longitude);
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
    history.push('/');
  }
  return (
    <>
    {isAuthenticated && (
      <div className="App">
    <TextField type="text" variant="standard" placeholder="Enter Place Category" value={query} onChange={(e)=>setQuery(e.target.value)} />
    <Button 
    variant="contained"
    color="secondary"
    onClick={()=>setParameterToSearch(query)}
    >Search Now</Button>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1Ijoid2ltc2dkIiwiYSI6ImNrZzg4bGtvYTBiNmUycWxzYmlmdW95ZDQifQ.RT-TaJBBkcFVrVqwuusKpQ"
        onViewportChange={(viewport) => setViewport(viewport)}
        mapStyle="mapbox://styles/wimsgd/ckgaja7go1om919olowxdob9u"
      >
        <MyPlace lati={lati} longi={longi}/>
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
        <SelectedButtons clicked={async()=>{
          
          setOpened(true);
         try {
           const viewRatings=await axios.get(`http://localhost:5000/rate/${selectedPlace.position.lat * selectedPlace.position.lng}`);
           setGetRatings(viewRatings.data);
         } catch (error) {
           console.log(error.message);
         }
          
        }}/>
       <MapModal opened={opened} getRatings={getRatings} ModalCloseClicked={()=>setOpened(false)} />
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
