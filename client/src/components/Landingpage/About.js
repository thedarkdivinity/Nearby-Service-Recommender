import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography } from "@material-ui/core/";
import RoomIcon from '@material-ui/icons/Room';
import ExploreIcon from '@material-ui/icons/Explore';
import MapIcon from '@material-ui/icons/Map';
const useStyles = makeStyles((theme) => ({
  grid: {
    width: "100%",
    margin: "0px",
  },
  paper:{
      padding:theme.spacing(5),
      textAlign:"center",
      background:theme.palette.secondary,
  }
}));
const About = () => {
  const classes = useStyles();
  return (
      <>
      
    <Typography variant="h2" component="h2" style={{textAlign:"center",marginTop:"60px"}} data-aos="zoom-in-right">About Us</Typography>
      <Grid container spacing={5} className={classes.grid}>
    
        <Grid item xs={12} md={4}>
          <Paper className={classes.paper} data-aos="flip-left" style={{backgroundColor:"#e15f41"}}>
          <RoomIcon fontSize="large"/>
          <Typography variant='body1' style={{marginTop:"40px"}}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
              debitis modi earum blanditiis, velit alias facere quam libero
              nihil sit maxime et repudiandae ipsum ut impedit voluptatem eius
              dolore laudantium incidunt quos possimus asperiores accusamus.
              Quam voluptates voluptatem dolor, voluptate libero perferendis
              vero. Eius repellat possimus explicabo natus. Mollitia, dolores.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
        <Paper className={classes.paper} data-aos="flip-down" style={{backgroundColor:"#e15f41"}}>
         <ExploreIcon fontSize="large"/>
          <Typography variant='body1' style={{marginTop:"40px"}}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
          debitis modi earum blanditiis, velit alias facere quam libero
          nihil sit maxime et repudiandae ipsum ut impedit voluptatem eius
          dolore laudantium incidunt quos possimus asperiores accusamus.
          Quam voluptates voluptatem dolor, voluptate libero perferendis
          vero. Eius repellat possimus explicabo natus. Mollitia, dolores.
          </Typography>
           
         
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
      <Paper className={classes.paper} data-aos="flip-right" style={{backgroundColor:"#e15f41"}}>
      <MapIcon fontSize="large"/>
      <Typography variant='body1'  style={{marginTop:"40px"}}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
          debitis modi earum blanditiis, velit alias facere quam libero
          nihil sit maxime et repudiandae ipsum ut impedit voluptatem eius
          dolore laudantium incidunt quos possimus asperiores accusamus.
          Quam voluptates voluptatem dolor, voluptate libero perferendis
          vero. Eius repellat possimus explicabo natus. Mollitia, dolores.
       </Typography>
      </Paper>
    </Grid>
    
      </Grid>
      

    </>
  );
};

export default About;
