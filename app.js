//jshint esversion:6
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Console } = require("console");
const saltRounds = 10;

const app = express();
console.log(process.env.API_KEY);

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// connect mongodb database to mongoose
mongoose.connect("mongodb://localhost:27017/useruserDB", {
  useNewUrlParser: true,
});

// set up our userDB schema
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = new mongoose.model("User", userSchema);

// render home page
app.get("/", function (req, res) {
  res.render("home");
});
// render login
app.get("/login", function (req, res) {
  res.render("login");
});
// render register
app.get("/register", function (req, res) {
  res.render("register");
});

app.post("/register", function (req, res) {
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    // Store hash in your password DB.
    const newUser = new User({
      email: req.body.username,
      // hash password thru md5
      password: hash
    });
    // save new users
    newUser.save(function (err) {
      if (err) {
        console.log(err);
      } else {
        res.render("secrets");
      }
    });
  });
});

app.post("/login", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  // check if email and password match
  User.findOne({ email: username }, function (err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
// Load hash from your password DB.
bcrypt.compare(password, foundUser.password, function(err, result) {
    // result == true
    if(result === true){
    res.render("secrets");

    }
});         
      }
    }
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000.");
});
