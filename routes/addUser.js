const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const values = require('../values');
const registerUser = require('../controllers/addUser');
const authmdlware = require('./../auth-middleware');


module.exports = () => {
    router.get("/",authmdlware(["role:Owner"]), (req,res)=>{
        res.render('pages/addRegister',{name: values.loginusername});
    });
    router.post("/registerUser",authmdlware(["role:Owner"]), registerUser.register);
    return router;
};