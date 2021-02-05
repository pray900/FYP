const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const addUser = require('./addUser');
const home = require('./home');
const inventory = require('./inventory');
const sale = require('./sale');
const customer = require('./customer');
const logs = require('./logs');
const register = require('./register');
const auth = require('../controllers/login');
const passport = require('passport');


module.exports = () => {
    router.get("/", (req,res)=>{
        res.render('pages/loginpage');
    });

    router.post("/login", auth.login);

    //router.post("/login", passport.Authenticator('local', {
    //    successRedirect: '/home',
    //    failureredirect:'/login',
    //    failureFlash: true
    //}));

    router.use("/addUser", addUser());

    router.use("/home", home());

    router.use("/inventorysearch", inventory());

    router.use("/salesearch", sale());

    router.use("/customersearch", customer());

    router.use("/logs", logs());

    router.use("/register", register());

    return router;
};