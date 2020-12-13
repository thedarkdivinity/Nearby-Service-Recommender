const express = require("express");
const path = require("path");
const cors=require('cors');

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();
const neo4j = require("neo4j-driver");
//view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


//middleware

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const driver = neo4j.driver(
  "bolt://localhost",
  neo4j.auth.basic("neo4j", "neo5j")
);
var session;
//home route

app.get("/",  async function (req, res) {
  session = driver.session();
  const users=await session.run("MATCH (n:user) RETURN n");
  res.status(200).json(users);
    

});
app.get("/places",async(req,res)=>{
      session = driver.session();
        const places=await session.run("MATCH (n:place) RETURN n");
        res.status(200).json(places);

    
    
})

//add user route
app.post("/user/add", async function (req, res) {
  session = driver.session();
  const {name,email,ulat,ulng} = req.body;

 const newUser= await  session
    .run(
      "MERGE (u:user {name:$name,email:$email,$ulat,$ulng}) RETURN u",
      {name,email ,ulat,ulng}
    );
    res.status(200).json(newUser);
    console.log(newUser);

});
//add place 
app.post("/place/add", async function (req, res) {
  session = driver.session();
  const { pid, pname,plat,plng,prating,ptype} = req.body;

  //console.log(name);
 const place=  await session
    .run(
      "MERGE  (n:place {pid:$pid,pname:$pname,plat:$plat,plng:$plng,prating:$prating,ptype:$ptye}) RETURN n",
      {
        pid,
        pname,
        plat,
        plng,
        prating,
        ptype

      }
    );
    res.status(200).json(place);
});
//VIEW PLACES
app.get("/place/view", async(req,res)=>{
  session = driver.session();
  const allPlaces= await session.run("MATCH (p:place) RETURN p");
  res.status(200).json(allPlaces);
});

//frnds connect route
app.post("/friends/add",  async function (req, res) {
  session = driver.session();
  const { email1, email2 } = req.body;

  const connection= await session
    .run(
      "MATCH(a:user {email:$email1}),(b:user {email:$email2}) MERGE(a)-[r:friends]->(b) RETURN r",
      {email1,email2 }
    );
    res.status(200).json(connection);

   
});
app.post("/friends/check",async(req,res)=>{
  session = driver.session();
  const { email1, email2 } = req.body;

  const check= await session.run("MATCH(a:user {email:$email1})<-[r:friends]-(b:user {email:$email2}) RETURN a,b,r",
  {email1,email2}
  );
  res.status(200).json(check.records);
})
//connect place to place
app.post("/placedist/connect",  async function (req, res) {
  session = driver.session();
  const { pid1, pid2 } = req.body;

   session
    .run(
      "MATCH(a:place {pid:$pid1}),(b:place {pid:$pid2}) MERGE(a)-[r:distance {dist:distance(point({latitude:toFloat(a.plat),longitude:toFloat(a.plng)}),point({latitude:toFloat(b.plat),longitude:toFloat(b.plng)}))}]->(b) RETURN r",
      { pid1, pid2 }
    )

    .then(function (result) {
      res.redirect("/");
   //   session.close();
    })

    .catch(function (error) {
      console.log(error);
    });
});
//connect user to place
app.post("/userratesplace/connect", async function (req, res) {
  session = driver.session();
  const { pid,rating,email} = req.body;


  const UserRatePlaces= await  session
    .run(
      "MATCH(a:user {email:$email}),(b:place {pid:$pid}) MERGE(a)-[r:rates {rating:$rating} ]->(b) RETURN r,a,b",
      { email, pid, rating }
    );
    res.status(200).json(UserRatePlaces);

    
});
 //RECOMMENDING PLACES TO USERS
app.post("/placerecommendation", async function (req, res) {
 session = driver.session();
    const {radius,ptype,email}=req.body;
 
  //console.log(name);
 const placerecommendation= await session
    .run("MATCH(me:user {email:$email})-[:friends]->(f),(f)-[r:rates]->(p:place) with p,distance(point({latitude:toFloat(me.ulat),longitude:toFloat(me.ulng)}),point({latitude:toFloat(p.plat),longitude:toFloat(p.plng)})) as d where r.rating > 3 AND d < $radius AND NOT (me)-[:rates]->(p) AND p.ptype=$ptye return p ORDER BY d ASC LIMIT 10",
   { radius,ptype,email }    
  );

res.status(200).json(placerecommendation);
});
// //Services having the shortest distance from my location
// app.post("/shortestdist", async function (req, res) {
//   session = driver.session();
//      const {email}=req.body;
  
//    //console.log(name);
//   const shortestdist= await session
//      .run("MATCH(me:user {email:$email}),(p:place) with p,distance(point({latitude:toFloat(me.ulat),longitude:toFloat(me.ulng)}),point({latitude:toFloat(p.plat),longitude:toFloat(p.plng)})) as d return p ORDER BY d ASC LIMIT 10",
//     { email }    
//    );
 
//  res.status(200).json(shortestdist);
//  });

// SIMPLIFIED RECOMMENDATION QUERY 
app.post("/recommend",async (req,res)=>{
  session = driver.session();
const {email}=req.body;
const recommendation=await session.run(
  "MATCH(me:user{email:$email})-[:friends]->(f:user),(f)-[r:rates]->(p:place)  RETURN DISTINCT p AS place",
  {email:email}
);
res.status(200).json(recommendation);
});
app.listen(9000);

console.log("Server started on port 9000");

module.export = app;
