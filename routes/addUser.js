const express = require('express');
const router = express.Router();


module.exports = () => {
    router.get("/", (req,res)=>{
        res.render('pages/addUser');
    });
    router.post("/registerUser", (req,res)=>{
        res.send("hello");
    });
    return router;
};