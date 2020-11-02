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



app.listen(5000,()=>{
    console.log('Server started on 5000');
})