import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import axios from 'axios';
import Logoutbutton from './Logoutbutton';
import  { useAuth0} from "@auth0/auth0-react"
import { useHistory } from "react-router-dom";
import {Animated} from "react-animated-css";

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
      fontSize: 35,
    },
    pos: {
      marginBottom: 12,
    },
  });

const Farm = () => {
    const classes = useStyles();
    const history = useHistory();
    // const [email,setEmail]=useState("");
    // const [fname,setFname]=useState("");
    // const [lname,setLname]=useState("");
    // const [pname,setPname]=useState("");
    // const [lat,setLat]=useState("");
    // const [lng,setLng]=useState("");
    const { user }=useAuth0();
    return (
        <>
        <Card className={classes.root}  style={{
            width:"500px",
            padding:"0px 20px",
            marginLeft:"auto",
            marginRight:"auto"
    
        }} variant="outlined">
        <form onSubmit={(e)=>{
          e.preventDefault();
        
          const {name,email,picture} =user;
          // const submission={
          //   email,
          //   fname,
          //   lname,
          //   pname,
          //   lat,
          //   lng

          // };
            const dataToPost={
              name,
              email,
              picture


            };
            const dataToPostToGraph={
              name,
              email
            }
            
             axios.post("http://localhost:5000/user",dataToPost);
            axios.post("http://localhost:9000/user/add",dataToPostToGraph);
         
          
          history.push('/map');
        }}>
        <CardContent>
        
          <Typography className={classes.title} color="textPrimary" variant="h2" style={{textAlign:"center"}} gutterBottom>
            View Map
          </Typography>
         
          <figure style={{display:"grid",placeItems:"center"}}>
          <img src={user.picture} className="animate__animated animate__backInUp" alt="Your Profile Picture" style={{borderRadius:"50%"}}/>
          </figure>
          
          </CardContent>
        <CardActions >
        <Logoutbutton/>
 
          <Button endIcon={
            
        
            <ArrowRightIcon className="animate__animated animate__rubberBand forever"/>
           
          } type="submit" className="animate__animated animate__bounceIn" variant="contained" color="primary" style={{marginLeft:"auto"}}>View Now</Button>
       
        </CardActions>
        </form>
      </Card> 
        </>
    )
}

export default Farm;
