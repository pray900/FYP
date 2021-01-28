const express = require('express');
const router = express.Router();

module.exports = () => {
    router.get("/", (req,res)=>{
        res.render('pages/saleSearch');
    });
    router.get("/newSale", (req,res)=>{
        res.render('pages/newsales');
    });
    return router;
};