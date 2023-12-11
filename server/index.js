
 require("dotenv").config();


const express = require("express");

const mysql = require("mysql");

const bodyparser = require("body-parser");

const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

app.use(bodyparser.json());

//db connection



const database = process.env.DATABASENAME

const db = mysql.createConnection({
    host:'localhost',
    database:database,
    user:'root',
    password:'kishore2003@mysql'
})


db.connect((err)=>{
    if(!err)
    {
        console.log("connected successfully to mysqlworkbench");
    }
    else{
        console.log(err);
    }
})




app.post('/',(req,res)=>{

    const sql_query = "INSERT INTO employee_table( id,Emp_name,Date_of_Birth,Emp_salary,Emp_Designation,Emp_joiningdate ) VALUES (?,?,?,?,?,?);"
    
    const values = [
        req.body.id,
        req.body.Empname,
        req.body.dob,
        req.body.salary,
        req.body.Designation,
        req.body.joindate
    ];

    const queryResult = 'SELECT * FROM employee_table';
    
    try{
        db.query(sql_query,values);
        db.query(queryResult,(err,result)=>{
            if(err){
                throw err;
            }
            else{
                res.json(result);
            }
        }) 
        console.log("submitted");
      }
      catch(error){
        console.error(error);
        res.status(500).json({error:'Internal server error'})
      }
})

app.listen(process.env.PORT,()=>{
    console.log("server started running successfully");
})

