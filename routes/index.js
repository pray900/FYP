const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const addUser = require('./addUser');
const home = require('./home');
const auth = require('../controllers/login');
const passport = require('passport');


module.exports = () => {
    router.get("/", (req,res)=>{
        res.render('pages/loginpage');
    });

    //router.post("/login", auth.login);

    router.post("/login", passport.Authenticator('local', {
        successRedirect: '/home',
        failureredirect:'/login',
        failureFlash: true
    }));

    router.use("/addUser", addUser());

    router.use("/home", home());

    return router;
};