const express = require('express');
const router = express.Router();
const registerUser = require('../controllers/addUser');

module.exports = () => {
    router.get("/", (req,res)=>{
        res.render('pages/register');
    });
    router.get("/addUser", (req,res)=>{
        res.render('pages/addUser');
    });
    router.get("/editUser", (req,res)=>{
        res.render('pages/editUser');
    });
    router.post("/registerUser", registerUser.register);
    return router;
};