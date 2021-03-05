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
const changepwd = require('./changepwd');
const forgotpassword = require('./forgotpassword');
const selectshop = require('../controllers/shopselector');
const codevalidate = require('../controllers/codevalidate');

const values1 = require("../values");

module.exports = () => {
    router.get("/", (req,res)=>{
        res.render('pages/login',{
            message: ""
        });
    });

    router.post("/login", auth.login);

    router.post("/submittedshop", selectshop.submitchoice);

    //router.post("/login", passport.Authenticator('local', {
    //    successRedirect: '/home',
    //    failureredirect:'/login',
    //    failureFlash: true
    //}));

    router.use("/addUser", addUser());

    router.use("/forgotpassword", forgotpassword());

    router.use("/home", home());

    router.use("/inventory", inventory());

    router.use("/sales", sale());

    router.use("/customer", customer());

    router.use("/logs", logs());

    router.use("/register", register());

    router.use("/changepwd", changepwd());

    router.post("/codevalid", codevalidate.validate);

    router.get("/logout", (req,res)=>{
        res.render('pages/login',{message: ""});
    });

    return router;
};