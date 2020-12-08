import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SendIcon from '@material-ui/icons/Send';
import { TextField } from '@material-ui/core';
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
    const classes = useStyles();
    return (
        <Card className={classes.root} style={{marginTop:"40px"}}>
      <CardContent>
        <Typography variant="h2" className="animate__animated animate__tada forever" style={{textAlign:"center"}} color="textSecondary" gutterBottom>
          Contact Us
        </Typography>
       <TextField fullWidth label="Name" style={{marginTop:"20px"}} variant="standard" color="secondary" />
       <TextField fullWidth label="Email" style={{marginTop:"20px"}} variant="standard" color="secondary"/>
       <TextField fullWidth label="Message" style={{marginTop:"20px"}} variant="standard" color="secondary" />
      </CardContent>
      <CardActions>
        <Button size="large" style={{
            marginLeft:"auto",
           
        }} variant="contained" color="secondary" endIcon={<SendIcon className="animate__animated animate__rubberBand forever"/>}>Submit</Button>
      </CardActions>
    </Card>
    )
}

export default ContactForm;
