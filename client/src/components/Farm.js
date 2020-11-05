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
import { useHistory } from "react-router-dom";

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
    const [email,setEmail]=useState("");
    const [fname,setFname]=useState("");
    const [lname,setLname]=useState("");
    const [pname,setPname]=useState("");
    const [lat,setLat]=useState("");
    const [lng,setLng]=useState("");
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
          const submission={
            email,
            fname,
            lname,
            pname,
            lat,
            lng

          }
          axios.post("http://localhost:5000/acquire",submission);
          history.push('/map');
        }}>
        <CardContent>
          <Typography className={classes.title} color="textPrimary" variant="h2" gutterBottom>
            Add A Store
          </Typography>
        
          <TextField variant="standard" color="primary" label="Email" 
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          
          placeholder="Enter Email" fullWidth/>
          <TextField 
          variant="standard" 
          value={fname}
          onChange={(e)=>setFname(e.target.value)}
          color="primary" 
          label="Fname" 
          style={{marginTop:"1.1rem"}} 
          placeholder="Enter Email" 
          fullWidth/>
          <TextField 
          variant="standard" 
          color="primary" 
          label="Lname" 
          value={lname}
          onChange={(e)=>setLname(e.target.value)}
          style={{marginTop:"1.1rem"}} 
          placeholder="Enter Email" 
          fullWidth/>
          <TextField 
          variant="standard" 
          color="primary" 
          value={pname}
          onChange={(e)=>setPname(e.target.value)}
          label="StoreName" 
          style={{marginTop:"1.1rem"}} 
          placeholder="Enter Email" 
          
          fullWidth/>
          <TextField 
          variant="standard" 
          color="primary" 
          label="Latitude" 
          style={{marginTop:"1.1rem"}} 
          value={lat}
          onChange={(e)=>setLat(e.target.value)}
          placeholder="Enter Latitude" 
          fullWidth/>
          <TextField 
          variant="standard" 
          color="primary" 
          label="Longitude" 
          value={lng}
          onChange={(e)=>setLng(e.target.value)}
          style={{marginTop:"1.1rem"}} 
          placeholder="Enter Longitude" 
          fullWidth/>
          </CardContent>
        <CardActions >
        <Logoutbutton/>
          <Button endIcon={<ArrowRightIcon/>} type="submit" variant="contained" color="primary" style={{marginLeft:"auto"}}>Submit</Button>
          
        </CardActions>
        </form>
      </Card> 
        </>
    )
}

export default Farm;
