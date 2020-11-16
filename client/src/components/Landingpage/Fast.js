import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography } from "@material-ui/core/";
import world from "../Landingpage/world.jpg";
const useStyles = makeStyles((theme) => ({
  grid: {
    width: "100%",
    margin: "0px",
  },
  paper: {
    padding: theme.spacing(5),
    textAlign: "center",
    background: theme.palette.secondary,
  },
}));
const Fast = () => {
  const classes = useStyles();
  return (
    <>
      <section style={{ width: "100%", height: "auto" }}>
        <Typography
          variant="h2"
          component="h2"
          style={{ textAlign: "center", marginTop: "60px" }}
        >
          Fast Maps
        </Typography>

        <div className="containe">
          <Grid container spacing={5} className={classes.grid}>
            <Grid item xs={12} md={6}>
              <Paper
                className={classes.paper}
                data-aos="fade-in-left"
                style={{ backgroundColor: "#e15f41", height: "100%" }}
              >
                <Typography variant="body1" style={{ marginTop: "40px" }}>
                  With a response time of a query being less than 0.4s,we offer
                  one of the fastest querying results.Search,Visit,Rate,Repeat.
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Consectetur veniam incidunt eligendi cum minima rerum animi
                  itaque asperiores fugit repellat sapiente repudiandae
                  consequuntur laboriosam rem iste, eum, est accusamus
                  architecto officia excepturi, quod dicta odit! Dolore
                  accusantium rerum voluptas, sit harum ipsum quos blanditiis
                  nostrum ipsa? Quas velit culpa sit omnis possimus unde cum
                  iure cupiditate voluptate, sunt animi reprehenderit quibusdam
                  accusamus assumenda vero voluptatum rem ratione quia
                  doloremque deleniti quisquam laudantium libero accusantium
                  maiores? Libero magni modi voluptatum consequuntur officia id
                  maxime minima! Sint fugit odit dignissimos ab natus.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <img
                data-aos="flip-down"
                src={world}
                style={{ height: "100%" }}
              />
            </Grid>
          </Grid>
        </div>
      </section>
    </>
  );
};

export default Fast;
