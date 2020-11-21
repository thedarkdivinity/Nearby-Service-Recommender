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
  neo4j.auth.basic("neo4j", "sayush")
);
const session = driver.session();
//home route

app.get("/",  async function (req, res) {
  const users=await session.run("MATCH (n:user) RETURN n");
  res.status(200).json(users);
    

});
app.get("/places",async(req,res)=>{
  
        const places=await session.run("MATCH (n:place) RETURN n");
        res.status(200).json(places);

    
    
})

//add user route

app.post("/user/add", async function (req, res) {
  const {name,email} = req.body;

 const newUser= await  session
    .run(
      "CREATE (n:user {name:$name,email:$email}) RETURN n",
      {name,email }
    );
    res.status(200).json(newUser);
    console.log(newUser);

});
//add place route
app.post("/place/add", async function (req, res) {
  const { pid, pname, prating, padd, plat, plong, ptype } = req.body;

  //console.log(name);
 const place=  await session
    .run(
      "CREATE (n:place {pid:$pid,pname:$pname,plat:$plat,plong:$plong,padd:$padd,prating:$prating,ptype:$ptype}) RETURN n",
      {
        pid,
        pname,
        prating,
        ptype,
        plat,
       plong,
        padd,
      }
    );
    res.status(200).json(place);
});

//frnds connect route
app.post("/friends/add",  async function (req, res) {
  const { email1, email2 } = req.body;

  const connection= await session
    .run(
      "MATCH(a:user {email:$email1}),(b:user {email:$email2}) MERGE(a)-[r:friends]->(b) RETURN r",
      {email1,email2 }
    );
    res.status(200).json(connection);

   
});
//connect place to place
app.post("/placedist/connect",  async function (req, res) {
  const { pid1, pid2 } = req.body;

   session
    .run(
      "MATCH(a:place {pid:$pid1}),(b:place {pid:$pid2}) MERGE(a)-[r:distance {dist:distance(point({latitude:toFloat(a.plat),longitude:toFloat(a.plong)}),point({latitude:toFloat(b.plat),longitude:toFloat(b.plong)}))}]->(b) RETURN r",
      { pid1, pid2 }
    )

    .then(function (result) {
      res.redirect("/");
      session.close();
    })

    .catch(function (error) {
      console.log(error);
    });
});
//connect user to place
app.post("/userratesplace/connect", async function (req, res) {
  const { email, pid, rating, rid } = req.body;


  const UserRatePlaces= await  session
    .run(
      "MATCH(a:user {email:$email}),(b:place {pid:$pid}) MERGE(a)-[r:rates {rating:$rating,rid:$rid} ]->(b) RETURN r",
      { email, pid, rating, rid }
    );
    res.status(200).json(UserRatePlaces);

    
});
//RECOMMENDING PLACES TO USERS
// app.post("/placerecommendation", async function (req, res) {

//     const {r,ptype}=req.body;
 
//   //console.log(name);
//  const placerecommendation= await session
//     .run(
//       "MATCH(me:user)-[:friends]->(f),(f)-[r:rates]-(p:place) WHERE r.rating > 3 AND NOT (me)-[:rates]->(p) AND p.ptype=$type AND distance(point({latitude:toFloat(me.ulat),longitude:toFloat(me.ulong)}),point({latitude:toFloat(p.plat),longitude:toFloat(p.plong)})) < $radius RETURN distinct p AS place,count(*) AS count  ORDER BY count DESC LIMIT 10",
//       { radius: r, type: ptype }
//     )

//   res.status(200).json(placerecommendation);
// });

app.listen(9000);

console.log("Server started on port 9000");

module.export = app;
