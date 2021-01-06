const express = require('express');
const app = express();

const mysql = require('mysql');
const bcrypt = require('bcrypt');

const path = require('path');
const port = 3000;

const routes = require('./routes');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'./views'));
app.use(express.static(path.join(__dirname + '/public')));

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