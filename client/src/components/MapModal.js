import React from 'react';
import Modal from "react-modal";
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {useAuth0} from '@auth0/auth0-react';
import { NavLink } from 'react-router-dom'
import Axios from 'axios';
import { useState } from 'react';
const MapModal = ({opened,getRatings,ModalCloseClicked}) => {
  const { user}=useAuth0();
 
    return (
        <Modal isOpen={opened} >
        <h2>View Ratings</h2>
        <Button variant="contained" color="secondary" onClick={ModalCloseClicked}>Close</Button>
       <ul>
       {getRatings.map((rati)=>{
        return(
          <li key={rati.pid}>{rati.email} {rati.pname} {rati.rating}
          <Button variant="contained" color="secondary" href={`/profile/${rati.email}/`}>View Profile</Button>
         <Button variant="contained" color="secondary" onClick={()=>{
           const friend= {
             email1:user.email,
             email2:rati.email
           };
            Axios.post("http://localhost:9000/friends/add",friend);
            
         
         }}>ADD FRIEND</Button>
         
          </li>
        );
       })}
       </ul>
        
        </Modal>
    )
}

export default MapModal
