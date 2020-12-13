import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SendIcon from '@material-ui/icons/Send';
import { TextField } from '@material-ui/core';
import { useState } from 'react';
import Axios from 'axios';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
      padding:"2px 20px",
      webkitBoxShadow: "0 0 10px gray",
     boxShadow:"0 0 10px gray"
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
      fontWeight:'bold',
    },
    pos: {
      marginBottom: 12,
    },
  });
const ContactForm = () => {
  const [name,setName]=useState();
const [email,setEmail]=useState();
const [msg,setMsg]=useState();
    const classes = useStyles();
    const contactHandler=(e)=>{
      e.preventDefault();
      const contactUS={
        name,
        email,
        msg
      };
      Axios.post("http://localhost:5000/contactus",contactUS);
      alert("Submitted");

    }
    return (
        <Card className={classes.root} style={{marginTop:"40px"}}>
        <form onSubmit={contactHandler}>
      <CardContent>
        <Typography variant="h2" className="animate__animated animate__tada forever" style={{textAlign:"center"}} color="textSecondary" gutterBottom>
          Contact Us
        </Typography>
        
       <TextField fullWidth onChange={(e)=>setName(e.target.value)} label="Name"   value={name} style={{marginTop:"20px"}} variant="standard" color="secondary" />
       <TextField fullWidth  onChange={(e)=>setEmail(e.target.value)} label="Email" type="email" value={email} style={{marginTop:"20px"}} variant="standard" color="secondary"/>
       <TextField fullWidth label="Message"   onChange={(e)=>setMsg(e.target.value)} value={msg} style={{marginTop:"20px"}} variant="standard" color="secondary" />
      </CardContent>
      <CardActions>
        <Button size="large" style={{
            marginLeft:"auto",
           
        }} variant="contained" color="secondary" type="submit" endIcon={<SendIcon className="animate__animated animate__rubberBand forever"/>}>Submit</Button>
      </CardActions>
      </form>
    </Card>
    )
}

export default ContactForm;
