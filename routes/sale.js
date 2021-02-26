const express = require('express');
const router = express.Router();

module.exports = () => {
    router.get("/", (req,res)=>{
        res.render('pages/sales');
    });
    router.get("/newSale", (req,res)=>{
        res.render('pages/newSales');
    });
    return router;
};