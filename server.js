const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const cors=require('cors');
const knex=require('knex');
const bcrypt = require("bcrypt");
const saltRounds = 10;

const register=require('./controllers/register');
const signin=require('./controllers/signin');
const profile=require('./controllers/profile');
const image=require('./controllers/image');

const db=knex({
    client:'pg',
    connection:{
        host:'127.0.0.1',
        user:'',
        password:'',
        database:'smart'
    }
})

app.use(bodyParser.json()); 
app.use(cors());


app.get('/',(req,res)=>{
    res.send(database.users);
})

app.post('/signin',(req,res)=>{signin.handleSignin(req,res,db,bcrypt)})
app.get('/profile/:id',(req,res)=>{profile.handleProfileGet(req,res,db)})
app.put('/image',(req,res)=>{image.handleImage(req,res,db)})
app.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt)})
app.post("/imageurl", (req, res) => {image.handleApiCall(req, res)});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Our app is running on port ${PORT}`);
});
