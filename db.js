const Pool =require('pg').Pool;
const pool=new Pool({
    user:"postgres",
    password:"sayush",
    database:"wim",
    host:"localhost",
    port:"5432"
});
module.exports=pool;