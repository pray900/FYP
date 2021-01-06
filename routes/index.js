const express = require('express');
const router = express.Router();
const addUser = require('./addUser');

module.exports = () => {
    router.get("/", (req,res)=>{
        res.render('pages/loginpage');
    });

    router.use("/addUser", addUser());

    return router;
};