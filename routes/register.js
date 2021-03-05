const express = require('express');
const router = express.Router();
const registerUser = require('../controllers/addUser');
const values = require('../values');

module.exports = () => {
    router.get("/", (req,res)=>{
        res.render('pages/register',{name: values.loginusername});
    });
    router.get("/addUser", (req,res)=>{
        res.render('pages/addRegister',{name: values.loginusername});
    });
    router.get("/editUser", (req,res)=>{
        res.render('pages/editRegister',{name: values.loginusername});
    });
    router.post("/registerUser", registerUser.register);
    return router;
};