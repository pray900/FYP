const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const registerUser = require('../controllers/addUser');


module.exports = () => {
    router.get("/", (req,res)=>{
        res.render('pages/addRegister');
    });
    router.post("/registerUser", registerUser.register);
    return router;
};