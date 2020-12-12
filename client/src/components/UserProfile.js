import Axios from 'axios';
import React from 'react'
import { useState ,useEffect} from 'react';
import { useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import VisitedPlaces from './VisitedPlaces';
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
    
   
const UserProfile = () => {
    const classes = useStyles();
    const { email } =useParams();
    const [stakeholder,setStakeholder]=useState([]);
    const [userName,setUserName]=useState();
    const [userEmail,setUserEmail]=useState();
    const [userdp,setUserDp]=useState();
    const takeData=async ()=>{
      
      try {
          const userData= await Axios.get(`http://localhost:5000/user/${email}`);
      
      setStakeholder(userData.data)
      
      setUserName(userData.data[0].uname);
      setUserEmail(userData.data[0].email);
      setUserDp(userData.data[0].userphoto);
      
      } catch (error) {
          console.log(error.message);

      }
      

  }
  const getRating=async ()=>{

    try {
      const myRatings= await Axios.get(`http://localhost:5000/rateme/${email}`);
      
    } catch (error) {
      console.log(error.message);
    }

  }
    useEffect( ()=>{
      takeData();
      getRating();
    
    }, [])
    return (
        <div className="userProfile">
        <Card className={classes.root}>
        <CardContent>
          <Typography style={{textAlign:"center"}} className={classes.title} color="textSecondary" gutterBottom>
            {userName}
          </Typography>
          <Typography style={{textAlign:"center"}} variant="h5" component="h2">
          {userEmail}
          </Typography>
          <img src={userdp} alt="userdp" style={{
            height:"120px",
            width:"120px",
            borderRadius:"50%",
            marginLeft:"auto",
            display:"block",
            marginRight:"auto"
          }}/>
         

          <VisitedPlaces email={userEmail}/>
        </CardContent>
       
      </Card>
      
        </div>
    )
}

export default UserProfile;
