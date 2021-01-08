const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const addUser = require('./addUser');
const auth = require('../controllers/login');


module.exports = () => {
    router.get("/", (req,res)=>{
        res.render('pages/loginpage');
    });

    router.post("/login", auth.login);

    router.use("/addUser", addUser());

    return router;
};