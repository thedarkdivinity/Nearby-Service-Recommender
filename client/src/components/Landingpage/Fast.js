
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography } from "@material-ui/core/";
import world from "../Landingpage/world.jpg";
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
const Fast = () => {
    const classes = useStyles();
  return (
   
     
     <>
      <section style={{width:"100%",height:"auto"}}>
     <Typography variant="h2" component="h2" style={{textAlign:"center",marginTop:"60px"}}>About Us</Typography>
     
     <div className="containe">
     <Grid container spacing={5} className={classes.grid}>
     
         <Grid item xs={12} md={6}>
           <Paper className={classes.paper} data-aos="fade-in-left" style={{backgroundColor:"#e15f41"}}>
           
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
         <Grid item xs={12} md={6}>
         <img data-aos="flip-in-right" src={world} alt=""/>
       </Grid>
       
     
       </Grid>
       </div>
       </section>  
 
     </>
     
  
    
  );
 
};

export default Fast;
