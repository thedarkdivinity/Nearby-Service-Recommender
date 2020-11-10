import React from 'react';
import { Switch, Route } from "react-router-dom";

import './App.css';
import Authorize from './components/Authorize';
import Mep from './components/Mep';
import UserProfile from './components/UserProfile';


const App = () => {
  return (
    <>
    <Switch>
    <Route exact path="/" component={Authorize}/>
    <Route exact path="/map" component={Mep}/>
    <Route exact path="/profile/:email" component={UserProfile}/>
    
    
    </Switch>
   
   
   </>
  )
}

export default App
