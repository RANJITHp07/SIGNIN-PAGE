const express=require('express');
const cors=require('cors')
const bodyParser = require('body-parser');

const app=express();


app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/login",(req,res)=>{
    
    res.json("super")
})

app.listen(3000,()=>{
    console.log("Successfully connected to the server")
})