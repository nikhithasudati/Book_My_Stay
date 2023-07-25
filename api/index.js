const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const User = require('./models/User.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config()

const app = express();
app.use(express.json());


const bcryptSalt = bcrypt.genSaltSync(8);
const jwtSecret ="dfadfjldkfja";
app.use(cors({
    credentials :true,
    origin : 'http://127.0.0.1:5173',
}));

app.get('/test',(req,res) => {
    res.json('te')
});


mongoose.connect(process.env.MONGO_URL);

app.post('/register',async(req,res) => {
    const {name,email,password} = req.body;
    try{
        const userDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password,bcryptSalt),
        });
        res.json(userDoc);

    }
    catch(e){
        res.status(422).json(e);
    }
   
});

app.post('/login',async(req,res) => {
    const {email,password} = req.body;
    const userDoc = await User.findOne({email})
    if(userDoc){
        const passOk = bcrypt.compareSync(password,userDoc.password);
        if (passOk){
            jwt.sign({email:userDoc.email,id:userDoc._id},jwtSecret,{},(err,token) =>{
                if (err) throw err;
                res.cookie('token','').json('pass ok');


            });
            
        }
        else{
            res.status(422).json('pass not ok');
        }
    }
    else{
        res.json('not found');
    }
});
app.listen(3000);