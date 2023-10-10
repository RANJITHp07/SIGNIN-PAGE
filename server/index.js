const express=require('express');
const cors=require('cors')
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const {db,connection}=require('./db')
const{ validationResult, check } =require('express-validator');

const app=express();


app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

(async()=>{
    await db();
})()

//to check the email and  name and password
const validateMiddleware = [
  check('username').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
  check('email').isEmail().withMessage('Invalid email'),
  check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  }
];
  
app.post("/login",validateMiddleware,async(req,res)=>{
const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const sql=`INSERT INTO signin (firstname, lastname, username, email, password)
    VALUES (${req.body.firstname}, ${req.body.lastname}, ${req.body.username}, ${req.body.email}, ${hashedPassword})`
    connection.query(sql,(err,data)=>{
        if(err){
           console.log(err)
        }else{
            res.json(data)
        }
    })
    
})

app.listen(3000,()=>{
    console.log("Successfully connected to the server")
})