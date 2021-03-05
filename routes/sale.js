const express = require('express');
const router = express.Router();
const values = require('../values');

module.exports = () => {
    router.get("/", (req,res)=>{
        res.render('pages/sales',{name: values.loginusername});
    });
    router.get("/newSale", (req,res)=>{
        res.render('pages/newSales',{name: values.loginusername});
    });
    return router;
};