const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const User = require('./models/User.js');
const bcrypt = require('bcryptjs');
require('dotenv').config()

const app = express();
app.use(express.json());


const bcryptSalt = bcrypt.genSaltSync(8);
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
app.listen(3000);