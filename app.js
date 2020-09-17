//jshint esversion:6
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const md5 = require('md5')
const { Console } = require('console');

const app = express();
console.log(process.env.API_KEY);

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}))

// connect mongodb database to mongoose 
mongoose.connect('mongodb://localhost:27017/useruserDB', {useNewUrlParser:true})

// set up our userDB schema
const userSchema = new mongoose.Schema ( {
    email: String,
    password: String
});


const User = new mongoose.model('User', userSchema)

// render home page 
app.get('/', function(req, res){
    res.render('home')
})
// render login
app.get('/login', function(req, res){
    res.render('login')
})
// render register
app.get('/register', function(req, res){
    res.render('register')
})

app.post('/register', function(req, res){
    const newUser = new User({
        email: req.body.username,
        // hash password thru md5
        password: md5(req.body.password)
    })
    // save new users
    newUser.save(function(err){
        if(err){
            console.log(err)
        }else{
            res.render('secrets')
        }
    })
})

app.post('/login', function(req, res){
    const username = req.body.username
    const password = md5(req.body.password)
    // check if email and password match
    User.findOne({email: username}, function(err, foundUser){
        if(err){
            console.log(err);
        }else{
            if(foundUser){
                if(foundUser.password === password){
                    res.render('secrets');
                }
            }
        }
    })

})


app.listen(3000, function(){
    console.log('Server started on port 3000.')
})