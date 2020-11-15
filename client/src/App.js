import React,{useEffect} from 'react';
import { Switch, Route } from "react-router-dom";

import './App.css';
import Authorize from './components/Authorize';
import MainPage from './components/Landingpage/MainPage';
import Mep from './components/Mep';
import UserProfile from './components/UserProfile';
import Aos from "aos";
import "aos/dist/aos"
import "aos/dist/aos.css";
const App = () => {
  useEffect(()=>{
    Aos.init({duration:2000})
  },[]);
  return (
    <>
    <Switch>
    <Route exact path="/" component={MainPage}/>
    <Route exact path="/auth" component={Authorize}/>
    <Route exact path="/map" component={Mep}/>
    <Route exact path="/profile/:email" component={UserProfile}/>
    
    
    </Switch>
   
   
   </>
  )
}

export default App;
