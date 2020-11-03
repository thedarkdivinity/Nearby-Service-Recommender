import React from 'react';
import { Switch, Route } from "react-router-dom";

import './App.css';
import Authorize from './components/Authorize';
import Mep from './components/Mep';


const App = () => {
  return (
    <>
    <Switch>
    <Route exact path="/" component={Authorize}/>
    <Route exact path="/map" component={Mep}/>
    
    
    </Switch>
   
   
   </>
  )
}

export default App
