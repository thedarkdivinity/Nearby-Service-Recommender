const express=require('express');
const app=express();
const pool=require('./db');
const cors=require('cors');
//MIDDLEWARE
app.use(express.json());
app.use(cors());

//GET AN ENTRY
app.get('/acquire',async (req,res)=>{
    try {
        const allEntries=await pool.query("SELECT * FROM  acquire");
        res.json(allEntries.rows);
    } catch (error) {
        console.error(error.message)
    }
})


// CREATE AN ENTRY
app.post('/acquire',async(req,res)=>{
    try {
        //await
        const {fname,lname,pname,lat,lng}=req.body;
        const newEntry=await pool.query("INSERT INTO acquire(fname,lname,pname,lat,lng) VALUES($1,$2,$3,$4,$5) RETURNING *",[fname,lname,pname,lat,lng])
        console.log(req.body);
    } catch (error) {
        console.error(error.message);
    }
});
//ADD NEW RATINGS
app.post('/rate',async (req,res)=>{

    try {
        //await
        const {pid,rating,email,pname,uname,userPic}=req.body;
        const newRating= await pool.query("INSERT INTO rating(pid,rating,email,pname,uname,userphoto) VALUES($1,$2,$3,$4,$5,$6) RETURNING *",[pid,rating,email,pname,uname,userPic])
        console.log(req.body);
    } catch (error) {
        console.error(error.message);
    }
})
//GET ALL RATINGS OF SELECTED PLACE
app.get('/rate/:pid',async(req,res)=>{
  const {pid}=req.params;
    try {
        //Await
        const allRatings=await pool.query("SELECT * FROM rating WHERE pid=$1",[pid]);
        res.status(200).json(allRatings.rows);
    } catch (error) {
        console.error(error.message);
    }
});
//GET ALL PLACES RATED BY USER OF A PROFILE
app.get('/rateme/:email',async(req,res)=>{
    const {email}=req.params;
      try {
          //Await
          const userRatings=await pool.query("SELECT * FROM rating WHERE email=$1",[email]);
          res.status(200).json(userRatings.rows);
      } catch (error) {
          console.error(error.message);
      }
  });
app.post('/user',async(req,res)=>{

    const {name,email,picture} =req.body;
    try {
        
        const User=await pool.query("INSERT INTO usertable(uname,email,userphoto) VALUES($1,$2,$3) RETURNING *",[name,email,picture]);
        res.status(200).json(User.rows);
    } catch (error) {
        console.error(error.message);
    }
})
app.get('/user/:email',async(req,res)=>{
    const { email } =req.params;
    try {
        const userD= await pool.query("SELECT * FROM usertable WHERE email=$1",[email]);
        res.status(200).json(userD.rows);
    } catch (error) {
        console.error(error.message);
   
    }
})
app.post('/contactus',async (req,res)=>{

    try {
        //await
        const {name,email,msg}=req.body;
        const contactUsObject= await pool.query("INSERT INTO contactus(uname,email,message) VALUES($1,$2,$3) RETURNING *",[name,email,msg])
       res.status(200).json(contactUsObject);
       
        console.log(req.body);
    } catch (error) {
        console.error(error.message);
    }
    console.log(uname);
});
// app.post('/shortestDistance',async (req,res)=>{

//     try {
//         //await
//         const {pid1,pid2,lat1,lng1,lat2,lng2}=req.body;
//         const shortestDistance= await pool.query("SELECT ST_Distance(
//             'SRID=$pid1;POINT($lat1, $lng1)::geometry',
//             'SRID=$pid2;LINESTRING($lat2,$lng2)::geometry'
//         )",[pid1,pid2,lat1,lng1,lat2,lng2])
//         console.log(req.body);
//     } catch (error) {
//         console.error(error.message);
//     }
//     console.log(uname);
// });
app.listen(5000,()=>{
    console.log('Server started on 5000');
})
