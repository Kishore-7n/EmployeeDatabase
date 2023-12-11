
import React from 'react'

import { useState } from 'react'

import { TextField,Button,Select,MenuItem,FormControl,Box,InputLabel } from '@mui/material'

import { DataGrid } from '@mui/x-data-grid';

import './Home.css';

function Home() {

    const[name,setname] = useState(" ");
    const[dob,setdob] = useState(" ");
    const[sal,setsal] = useState(0);
    const[role,setrole] = useState(" ");
    const[joindate,setjoindate] = useState(" ");
    const[employees,setemployees] = useState([]);

    const getid = () => {

        return Math.floor(Math.random() * 100) + 1;
    }

    const handlesubmit = async(e) => {
        e.preventDefault();
        const url = "http://localhost:8000/";
        const formdata = await fetch(url,{
            method:"post",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                "Empname":name,
                "dob":dob,
                "salary":sal,
                "Designation":role,
                "joindate":joindate,
                "id":getid()

            })
        })

        const formdatares = await formdata.json();
        console.log(formdatares);

        const employeeswithdates = formdatares.map((employee, index) => ({
            ...employee,
            Date_of_Birth: new Date(employee.Date_of_Birth).toLocaleDateString(),
            Emp_joiningdate :new Date(employee.Emp_joiningdate).toLocaleDateString()

          }));
        setemployees(employeeswithdates);
        setname(" ");
        setdob(" ");
        setsal(0);
        setrole(" ");
        setjoindate(" ");

        
    }

    const columns = 
    [ 
        {field:'id',headerName:'ID',width:80},
        {field:'Emp_name',headerName:'Name',width:130},
        {field:'Date_of_Birth',headerName:'DateofBirth',width:130},
        {field:'Emp_salary',headerName:'Salary',width:130},
        {field:'Emp_Designation',headerName:'Designation',width:130},
        {field:'Emp_joiningdate',headerName:'JoiningDate',width:130}
  ]
  return (
    <div className='container'>
    <h1 style={{textAlign:"center",marginTop:"10px"}}>EMPLOYEE DATABASE</h1>
    <form  onSubmit={handlesubmit} className='form-container'>
    <Box mb={2}>
        <TextField
            name='Empname'
            label="Name"
            type='text'
            required
            sx={{width:"300px"}}
            value={name}
            onChange={(e)=>setname(e.target.value)}
        />
     </Box>
     <Box mb={2}>
         <TextField
            name='dob'
            label="Date of Birth"
            type = "date"
            required
            sx={{width:"300px"}}
            value={dob}
            onChange={(e)=>setdob(e.target.value)}
            InputLabelProps={{shrink:true}}
        />
    </Box>
    <Box mb={2}>
         <TextField
            name='salary'
            label="salary"
            type = "number"
            required
            sx={{width:"300px"}}
            value={sal}
            onChange={(e)=>setsal(e.target.value)}
        />
    </Box>
    <Box mb={2}>
            <FormControl>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    label="Role"
                    name='Designation'
                    required
                    variant='outlined'
                    sx={{width:"300px"}}
                    value={role}
                    onChange={(e)=>setrole(e.target.value)}
                    >
                        <MenuItem value="Developer">Developer</MenuItem>
                        <MenuItem value="Manager">Manager</MenuItem>
                        <MenuItem value="Human Resources">Human Resources</MenuItem>
                        <MenuItem value="Team Lead">Team Lead</MenuItem>
                    </Select>
            </FormControl>
    </Box>
    <Box mb={2}>
         <TextField
            name='joindate'
            label="Joining Date"
            type = "date"
            required
            sx={{width:"300px"}}
            value={joindate}
            onChange={(e)=>setjoindate(e.target.value)}
            InputLabelProps={{shrink:true}}
        />
    </Box>
    <Button variant='contained' sx={{width:"300px"}} type='submit'>
        SUBMIT
    </Button>
    </form>
    <div className='datagrid-container'>
        <DataGrid
            rows={employees}
            columns={columns}
        />

    </div>
    </div>
  )
}

export default Home
