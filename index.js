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
        console.error(err.message)
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
        const {pid,rating,email,pname,uname}=req.body;
        const newRating= await pool.query("INSERT INTO rating(pid,rating,email,pname,uname) VALUES($1,$2,$3,$4,$5) RETURNING *",[pid,rating,email,pname,uname])
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
        res.json(allRatings.rows);
    } catch (error) {
        console.error(error.message);
    }
})

app.listen(5000,()=>{
    console.log('Server started on 5000');
})