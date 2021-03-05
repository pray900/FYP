const express = require('express');
const router = express.Router();
const values = require('../values');

module.exports = () => {
    router.get("/", (req,res)=>{
        res.render('pages/logs',{name: values.loginusername});
    });
    return router;
};