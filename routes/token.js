const express = require('express');
const router = express.Router();
const values = require('../values');
const jwt = require("jsonwebtoken");
const authmdlware = require('./../auth-middleware');
const config = require('./../config');

module.exports = () => {

    router.get("/", (req,res)=>{
        const payload = {
            // role: values.role
            name: "user",
            scopes: ["role:"+values.role]
        };
        
        const token = jwt.sign(payload, config.JWT_SECRET);
        //res.send(token);
        values.accesstoken = token;
        res.status(200).redirect("/home");
    });

    return router;    
}