import React, { useState, useEffect } from "react";
import AddIcon from '@material-ui/icons/Add';
import ReactMapGL, {  Marker ,Popup,NavigationControl} from "react-map-gl";
import Modal from "react-modal";
import Mar from "../../src/marker.jpg";
import Drawer from '@material-ui/core/Drawer';
import {useAuth0} from '@auth0/auth0-react';
import axios from "axios";
import { useHistory } from "react-router-dom";
import CancelIcon from '@material-ui/icons/Cancel';
import { Button, IconButton, TextField, Typography} from "@material-ui/core";
import MyPlace from "./MyPlace";
import SelectedButtons from "./SelectedButtons";
import MapModal from "./MapModal";
import ViewPlace from "./ViewPlace";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';

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
  const [radius,setRadius]=useState(10);
  const [drawerOpen,setDrawerOpen]=useState(false);
  const [rating,setRating]=useState(1);
  const [opened,setOpened]=useState(false);
  const [lati, setLati] = useState(0);
  const [longi, setLongi] = useState(0);
  const [locationModal,setLocationModal]=useState(false)
  const [places,setPlaces]=useState([]);
  const [query,setQuery]=useState("");
  const [selectedPlace,setSelectedPlace]=useState(null);
  const [parameterToSearch,setParameterToSearch]=useState("petrol stations");
  const [alertShown,setAlertShown]=useState(true);
  const [jagahName,setJagahName]=useState("");
  const [showRecommend,setShowRecommend]=useState([]);
  const [getRatings,setGetRatings]=useState([]);
  const [recModal,setRecModal]=useState(false);
 
  const ApiKey =
    "pk.eyJ1Ijoid2ltc2dkIiwiYSI6ImNrZzg4bGtvYTBiNmUycWxzYmlmdW95ZDQifQ.RT-TaJBBkcFVrVqwuusKpQ";
  const HereKey = "SsQDGgfyRDH31cHPtVCPz2w9WimPDEbQjHyAR_Xb-NY";
  useEffect(() => {
    getLocation();
  }, [lati,longi]);
  useEffect(()=>{
    getRecommendations();

  },[]);
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
    // console.log(lati + " ");
    // console.log(longi);

    getLocs();
  };

  //HANDLE RATINGS FORM
  const ratingHandler=(e)=>{
    e.preventDefault();
    alert("submitted")
    const email=user.email;
    const uname=user.name;
    const userPic=user.picture;
    const pname=selectedPlace.title;
    const pid=selectedPlace.position.lat * selectedPlace.position.lng;
    const latitude=selectedPlace.position.lat;
    const longitude=selectedPlace.position.lng;
    // console.log(email);
    const ratingObject={
      pid,
      rating,
      email,
      pname,
      uname,
      userPic
    };
    const graphRatingObject={
      pid,
      rating,
      email,
      pname,
    }
    const addedPlace={
      pid,
      pname,
      latitude,
      longitude
    };
    const ratedPlace={
      pid,
      email,
      rating
    };
    axios.post("http://localhost:9000/place/add",addedPlace);

    axios.post("http://localhost:5000/rate",ratingObject);
    setTimeout(()=>{
      axios.post("http://localhost:9000/userratesplace/connect",graphRatingObject);
    },5000);
    
  }
  const getRecommendations= async()=>{
    try {
      const recommendations= await axios.get(`http://localhost:9000/recommend/${user.email}`);
      setShowRecommend(recommendations.data);


    } catch (error) {
      
    }
  }
  const AddPlace=()=>{
    const pid= lati * longi;
    const newPlace={
     pid,
     pname:jagahName,
     latitude:lati,
     longitude:longi

    };
    axios.post("http://localhost:9000/place/add",newPlace);
    
  }
  if(!isAuthenticated && alertShown){
    alert("You need to log in");

    setAlertShown(false);
    history.push('/auth');
  }
  return (
    <>
    {isAuthenticated && (
      <div className="App">
      <div style={{display:"flex",justifyContent:"space-around",flexWrap:"wrap"}}>
    <TextField type="text" variant="standard" placeholder="Enter Place Category" value={query} onChange={(e)=>setQuery(e.target.value)} />
    <Button 
    variant="contained"
    color="secondary"

    onClick={()=>setParameterToSearch(query)}
    >Search Now</Button>
    <Button 
    variant="contained"
    color="secondary"
      onClick={()=>setRecModal(true)}
    >View Friend Recommendation</Button>
    <Modal isOpen={recModal} >
    <Typography variant="h4" > Your Recommendations are ...</Typography>
<List>
{showRecommend.map((sr)=>{
  return(
    <li>{sr.pname}</li>
  )
})}
</List>
<Button variant="contained" color="secondary" onClick={()=>setRecModal(false)}>CLOSE</Button>
    </Modal>
    <TextField type="number" variant="standard" placeholder="Enter radius" style={{display:"block"}} value={radius} onChange={(e)=>setRadius(e.target.value)} />

    <Button 
    className="addMarginTopOnMobile"
    variant="contained"
    color="secondary"
      onClick={()=>setLocationModal(true)}
   
    >Add  New Place at my location</Button>
    
  
    
    <Modal isOpen={locationModal}>
    <IconButton aria-label="closeButton" onClick={()=>setLocationModal(false)} style={{marginLeft:"auto"}}><CancelIcon htmlColor="red" /></IconButton>
  
   
    <TextField fullWidth variant="standard" value={jagahName} onChange={(e)=>{
      setJagahName(e.target.value);
    }} label="place name"/>
    <Button variant="contained"  color="secondary" onClick={AddPlace} endIcon={<AddIcon/>}>Add this Place </Button>
    
    </Modal>
    </div>

      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1Ijoid2ltc2dkIiwiYSI6ImNrZzg4bGtvYTBiNmUycWxzYmlmdW95ZDQifQ.RT-TaJBBkcFVrVqwuusKpQ"
        onViewportChange={(viewport) => setViewport(viewport)}
        mapStyle="mapbox://styles/wimsgd/ckgaja7go1om919olowxdob9u"
        
      >
      <div style={{position: 'absolute', right: 100,top:100}}>
          <NavigationControl />
        </div>
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
        <Button
        variant="contained"
        color="secondary" 
        onClick={()=>setDrawerOpen(true)}
        style={{
          
        display:"block",
        marginTop:"10px"
        }}
        >Want to know more</Button>
        
       <MapModal opened={opened} getRatings={getRatings} ModalCloseClicked={()=>setOpened(false)} />
        </div>
        </form>
        </div>
        </Popup>
       ): null}
     
      </ReactMapGL>
      <Drawer anchor="left"
     
      open={drawerOpen} onClose={()=>setDrawerOpen(false)}>
      <div style={{
        height:"100vh",
        width:"300px"
      }}>
      
      <ViewPlace selectedPlace={selectedPlace}/>
      
      </div>
      </Drawer>
    </div>

    )}
    
    </>
  );
}

export default Mep;
