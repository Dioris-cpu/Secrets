//jshint esversion:6
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const encrypt = require('mongoose-encryption')

const app = express();

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

// encryption
const secret = 'Thisisourlittlesecret'
userSchema.plugin(encrypt, { secret: secret, encryptedFields: ['password']  })

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
        password: req.body.password
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
    const password = req.body.password
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