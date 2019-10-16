const express = require("express")
const users = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken");
//const hass = require("crypto-js");



const User = require("../models/User")
users.use(cors())


process.env.SECRET_KEY = 'secret'




//==================================================
//    ============register users==========
//==================================================

users.post('/register', function(req, res) {
    
    const today = new Date()
    var name = req.body.first_name;
    var emails = req.body.email;
    var pass = req.body.password;
    var last = req.body.last_name;
   

    const userData = {
        first_name: name,
        last_name:  last,
        email: emails,
        password:  pass,
        created:  today
    }
    User.findOne({
        where: {
            email: req.body.email,
        }
    })
    .then(user =>{
        if(!user){
            User.create(userData)  
        .then(user =>{
            res.json({status: user.email + "registered"})
        })
        .catch(err => {
            res.send('error: ' + err)
        })
        }else{
            res.json({error:"User already exists"})
        }
    })
    .catch(err =>{
       
        res.send('error: ' + err)
    })
})


//==================================================
//       ==========post products=========
//==================================================

users.post('/post', function(req, res) {
    
    var name=req.body.coffee;
    const userData = {
        coffeName: "aaaaaa",
        price:     "34",
        info:      "wwwwwwwwwww",
        type:      "A",
        amount:    "11"
    }
    User.findOne({
        where: {
            coffeName: name
        }
    })
    .then(user =>{
        if(!user){
          
        }else{
            res.json({error:"User already exists"})
        }
    })
    .catch(err =>{
       
        User.create(userData)  
        .then(user =>{
            res.json({status: user.coffeName + "registered"})
        })
        .catch(err => {
            res.send('error: ' + err)
        })
        res.send('error: ' + err)
    })
})



//==================================================
//          ============login==========
//==================================================
users.post('/login', (req, res)=>{
User.findOne({
    where: {
        email:req.body.email
    }
})

.then(user =>{
    if(user){
        if(true){
            let token = jwt.sign(user.dataValues, process.env.SECRET_KEY,{
                expiresIn: 1440
            })
            res.send(token)
        }
    }else{
        res.status(400).json({error:'User does not exist'})
    }

})
.catch(err =>{
    res.status(400).json({error: err})
})
})


module.exports = users