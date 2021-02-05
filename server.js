const express = require('express');
const app = express();

const mysql = require('mysql');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
//const cookieparser = require('cookie-parser');

//const passport = require('passport');
//const initializepassport = require('./passport-config');
//const flash = require('express-flash');
const session = require('express-session');

//if (process.env.NODE_ENV !== 'production'){
//    require('dotenv').config()
//}

//initializepassport(passport);
//app.use(flash());
//app.use(session({
//   secret: 'secret',
//   resave: false,
//   saveUninitialized: false
//}))
//app.use(passport.session());

const path = require('path');
const port = 3000;

const routes = require('./routes');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'./views'));
app.use(express.static(path.join(__dirname + '/public')));

//dotenv.config({path: './.env'});


app.use(express.urlencoded({ extended: false}));
app.use(express.json());

//app.use(cookieparser());

const db = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "",
    database:"fyp"
});

db.connect((err)=>{
    if(err){
        console.log("error is", err);
        throw err;
    }
    console.log("mysql connected.");
});

app.use('/',routes());

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
});